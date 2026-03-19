# Frontend Redesign Plan

**Goal**: Reduce clicks, surface personal context, and make the app feel like a sports dashboard — not an admin panel.

## Problem

The app is organized around org hierarchy (org → league → team) but users think in personal context (my team → my next game → my standings). It takes 5+ clicks to answer "when do I play next?"

## Changes

### 1. Dashboard Redesign

**Current**: 4 stat cards with counts, list of org names, list of team names.

**New**: Personalized home screen.

- **Upcoming games section**: For each of the user's active teams, show the next scheduled match — opponent name, date/time, league name. If a game is today, highlight it.
- **Team snapshots**: Each team card shows W-L-T record, league rank, and league name inline. No need to drill into standings.
- **Recent results**: Last completed game per team — score and opponent.
- Remove the generic stat cards (org count, team count). Replace with contextual info.

**Files**: `src/app/dashboard/page.tsx`, new helper functions in `src/data/index.ts`

### 2. Tabbed League Page

**Current**: League overview links to 3 separate pages (schedule, standings, teams). Each is a separate route requiring navigation.

**New**: Single league page with client-side tabs: Schedule | Standings | Teams | Bracket.

- Inline the content from schedule, standings, and teams pages into tab panels.
- Keep the existing separate routes working (for direct links) but make the tabbed view the primary experience.
- Add a Bracket tab for elimination-type leagues.

**Files**: `src/app/dashboard/organizations/[orgSlug]/leagues/[leagueSlug]/page.tsx`, new bracket component

### 3. Bracket Visualization

**Current**: No bracket view despite the data model supporting single/double elimination.

**New**: Visual bracket component for elimination leagues.

- Tree-style bracket showing matchups per round.
- Completed matches show scores, upcoming matches show "TBD" or team names.
- Works for both single and double elimination.
- Displayed as a tab on the league page.

**Files**: New `src/components/league/bracket-view.tsx`

### 4. Enriched My Teams Page

**Current**: List of team cards with name/league/org. Click goes to roster.

**New**: Each team card expanded to show:

- Team record (W-L-T) and league rank
- Next upcoming game (opponent, date/time)
- Last result (score, opponent)
- League status badge
- Click still goes to team detail

**Files**: `src/app/dashboard/my-teams/page.tsx` or refactor `src/components/team/team-card.tsx`

### 5. Breadcrumb Navigation

**Current**: No breadcrumbs. Deep pages have no orientation.

**New**: Breadcrumb trail on all pages deeper than 1 level.

- Format: `Organizations / NYU Intramurals / Spring 2026 Basketball / Schedule`
- Each segment is a link.
- Compact on mobile (show last 2 segments with ellipsis).

**Files**: New `src/components/layout/breadcrumbs.tsx`, update deep page layouts

### 6. Data Layer Additions

New helper functions needed in `src/data/index.ts`:

- `getNextMatch(teamId)` — next scheduled match for a team
- `getLastResult(teamId)` — most recent completed match for a team
- `getTeamStanding(teamId, leagueId)` — standing for a specific team
- `getUserUpcomingMatches(userId)` — all upcoming matches across user's teams

## Execution Order

1. Data layer additions (unblocks everything else)
2. Dashboard redesign (biggest impact)
3. Enriched My Teams page (reuses same data helpers)
4. Breadcrumb component (quick win)
5. Tabbed league page (consolidation)
6. Bracket visualization (new feature)

## Non-Goals

- Backend/API — stays as mock data
- Auth — stays as hardcoded current user
- Mutations (scoring, roster management) — separate effort
- Visual/aesthetic redesign — separate effort, this plan is structural
