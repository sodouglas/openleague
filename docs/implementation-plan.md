# Backend Implementation Plan

Tactical plan for building the OpenLeague backend on Next.js with PostgreSQL, Drizzle ORM, and server actions.

Last updated: 2026-03-19

---

## Database Schema (PostgreSQL via Drizzle ORM)

### `users`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key, default `gen_random_uuid()` |
| name | text | Display name |
| email | text | Unique, used for auth |
| avatar_url | text | Nullable, profile image URL |
| created_at | timestamp | Default `now()` |

### `organizations`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | Organization display name |
| slug | text | Unique, URL-friendly identifier |
| description | text | Nullable |
| owner_id | uuid | FK to `users.id` |
| created_at | timestamp | Default `now()` |

### `org_members`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| org_id | uuid | FK to `organizations.id` |
| user_id | uuid | FK to `users.id` |
| role | enum | `owner`, `admin`, `member` |
| created_at | timestamp | Default `now()` |

Unique constraint on `(org_id, user_id)`.

### `leagues`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| org_id | uuid | FK to `organizations.id` |
| name | text | League display name |
| slug | text | Unique within org |
| sport | enum | `basketball`, `soccer`, `volleyball`, `softball`, `flag_football` |
| season | text | e.g., "Spring 2026" |
| max_teams | integer | Cap on team registrations |
| bracket_type | enum | `round_robin`, `single_elimination`, `double_elimination` |
| status | enum | `registration`, `in_progress`, `completed` |
| invite_code | text | Unique, used by captains to join |
| created_at | timestamp | Default `now()` |

Unique constraint on `(org_id, slug)`.

### `teams`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| league_id | uuid | FK to `leagues.id` |
| name | text | Team display name |
| captain_id | uuid | FK to `users.id` |
| created_at | timestamp | Default `now()` |

### `team_members`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| team_id | uuid | FK to `teams.id` |
| user_id | uuid | FK to `users.id` |
| role | enum | `captain`, `player` |
| status | enum | `active`, `invited`, `declined` |
| created_at | timestamp | Default `now()` |

Unique constraint on `(team_id, user_id)`.

### `matches`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| league_id | uuid | FK to `leagues.id` |
| home_team_id | uuid | FK to `teams.id` |
| away_team_id | uuid | FK to `teams.id` |
| round | integer | Round number in bracket/schedule |
| home_score | integer | Nullable until completed |
| away_score | integer | Nullable until completed |
| status | enum | `scheduled`, `in_progress`, `completed` |
| scheduled_at | timestamp | When the match is played |
| created_at | timestamp | Default `now()` |

### `standings`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| league_id | uuid | FK to `leagues.id` |
| team_id | uuid | FK to `teams.id` |
| wins | integer | Default `0` |
| losses | integer | Default `0` |
| ties | integer | Default `0` |
| points_for | integer | Default `0` |
| points_against | integer | Default `0` |
| rank | integer | Calculated position |

Unique constraint on `(league_id, team_id)`.

### Key Relationships

```
users 1──M org_members M──1 organizations
users 1──M team_members M──1 teams
organizations 1──M leagues 1──M teams
leagues 1──M matches
leagues 1──M standings M──1 teams
```

---

## Auth Setup

### Provider: Better Auth (preferred) or NextAuth

Better Auth is the recommended choice for new Next.js projects due to its simpler API and built-in email/password support. NextAuth is a fallback if OAuth provider coverage is needed early.

### Configuration

- **Email/password** as the primary auth method
- **OAuth** (Google, GitHub) as optional secondary methods
- **Sessions** stored in the database (not JWT) for easy revocation
- **Email verification** required before org creation

### Middleware

Create a `middleware.ts` at the project root for route protection:

```
Public routes:     /login, /register, /invite/*
Protected routes:  /dashboard/*, /org/*, /league/*
API routes:        /api/* (validate session in each handler)
```

Auth check flow:
1. Middleware reads session cookie
2. No session -> redirect to `/login`
3. Valid session -> continue to route
4. Role checks happen in server actions, not middleware

---

## Server Actions and Queries

### Organizations

| Action | Input | Behavior |
|---|---|---|
| `createOrg` | name, slug, description | Create org + add current user as owner in `org_members` |
| `updateOrg` | orgId, fields | Owner only. Update org settings |
| `deleteOrg` | orgId | Owner only. Cascade delete all leagues, teams, matches |
| `addOrgMember` | orgId, email, role | Owner/Admin. Send invite or add existing user |
| `removeOrgMember` | orgId, userId | Owner/Admin. Cannot remove the owner |

### Leagues

| Action | Input | Behavior |
|---|---|---|
| `createLeague` | orgId, name, sport, season, bracketType, maxTeams | Owner/Admin. Generate invite code |
| `updateLeague` | leagueId, fields | Owner/Admin. Cannot change sport after teams join |
| `deleteLeague` | leagueId | Owner/Admin. Cascade delete teams, matches, standings |
| `joinLeague` | inviteCode | Captain. Create team entry in league |
| `regenerateInviteCode` | leagueId | Owner/Admin. Invalidate old code |

### Teams

| Action | Input | Behavior |
|---|---|---|
| `createTeam` | leagueId, name | Captain. Check max_teams limit |
| `invitePlayer` | teamId, email | Captain. Create `team_members` row with status `invited` |
| `respondToInvite` | teamMemberId, accept/decline | Player. Update status |
| `removePlayer` | teamMemberId | Captain. Remove from roster |
| `transferCaptain` | teamId, newCaptainId | Captain. Swap roles |
| `leaveTeam` | teamId | Player only. Captains must transfer first |

### Matches and Scheduling

| Action | Input | Behavior |
|---|---|---|
| `generateSchedule` | leagueId | Owner/Admin. Build matches based on bracket_type |
| `updateScore` | matchId, homeScore, awayScore | Owner/Admin. Update match + recalculate standings |
| `updateMatchStatus` | matchId, status | Owner/Admin. Transition match state |

### Data Fetching (Queries)

Use server components with direct database queries (no API routes needed):

```typescript
// Example: fetch league with teams for a server component
async function getLeagueWithTeams(leagueId: string) {
  return db.query.leagues.findFirst({
    where: eq(leagues.id, leagueId),
    with: {
      teams: { with: { members: true } },
      standings: { orderBy: [asc(standings.rank)] },
    },
  });
}
```

Key queries:
- `getOrgsByUser(userId)` -- dashboard: list user's organizations
- `getLeaguesByOrg(orgId)` -- org page: list leagues
- `getLeagueDetails(leagueId)` -- league page: teams, schedule, standings
- `getTeamRoster(teamId)` -- team page: members and statuses
- `getStandings(leagueId)` -- standings page: ranked teams with records
- `getSchedule(leagueId)` -- schedule page: matches ordered by round and date

---

## Phased Implementation

### Phase 1: Auth + Organizations

**Goal:** Users can sign up, create orgs, and invite admins.

Tasks:
1. Set up PostgreSQL database and Drizzle ORM configuration
2. Define schemas for `users`, `organizations`, `org_members`
3. Configure Better Auth with email/password
4. Build middleware for route protection
5. Build server actions: `createOrg`, `updateOrg`, `addOrgMember`, `removeOrgMember`
6. Build pages: `/login`, `/register`, `/dashboard`, `/org/[slug]/settings`

**Done when:** A user can register, create an org, invite an admin by email, and both see the org dashboard.

### Phase 2: Leagues + Teams

**Goal:** Admins create leagues. Captains join via invite code and build rosters.

Tasks:
1. Define schemas for `leagues`, `teams`, `team_members`
2. Build server actions: `createLeague`, `joinLeague`, `createTeam`, `invitePlayer`, `respondToInvite`
3. Build pages: `/org/[slug]/leagues`, `/league/[id]`, `/league/[id]/teams`
4. Build invite code flow: generate, share, validate, join

**Done when:** An admin creates a league, a captain joins with an invite code, creates a team, and invites players who can accept.

### Phase 3: Scheduling + Matches

**Goal:** Admins generate schedules. Scores can be entered and matches progress through states.

Tasks:
1. Define schema for `matches`
2. Build round-robin schedule generator (start here -- simplest algorithm)
3. Build server actions: `generateSchedule`, `updateScore`, `updateMatchStatus`
4. Build pages: `/league/[id]/schedule`, `/match/[id]`
5. Add single-elimination bracket generation

**Done when:** An admin generates a round-robin schedule, enters scores for matches, and match statuses update correctly.

### Phase 4: Standings + Statistics

**Goal:** Standings auto-calculate from match results. Basic stats are visible.

Tasks:
1. Define schema for `standings`
2. Build standings calculation triggered by score updates
3. Build tiebreaker logic (wins -> head-to-head -> point differential)
4. Build pages: `/league/[id]/standings`
5. Add per-team stats view (record, points for/against, schedule)

**Done when:** Standings update automatically after score entry, teams are ranked correctly, and tiebreakers resolve as expected.
