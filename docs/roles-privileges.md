# Roles and Privileges

Access control model for OpenLeague organizations, leagues, and teams.

Last updated: 2026-03-19

---

## Roles

### Org Owner

The person who creates the organization. Full control over org settings, membership, and all leagues within the org. Cannot be removed -- only transferred. One owner per organization.

### Org Admin

Trusted operators added by the Org Owner. Can manage leagues, enter scores, and generate schedules. Cannot modify org-level settings or billing. An org can have multiple admins.

### Captain

A player who creates or leads a team within a league. Joins via invite code, creates a team, and manages their own roster. Has no org-level permissions.

### Player

An individual who accepts a team invite. Can view league information and manage their own team membership. No administrative capabilities.

---

## Permission Matrix

| Action | Org Owner | Org Admin | Captain | Player |
|---|---|---|---|---|
| Create/delete organization | Yes | — | — | — |
| Edit org settings | Yes | No | No | No |
| Add/remove org members | Yes | Yes | No | No |
| Create/edit leagues | Yes | Yes | No | No |
| Generate schedules | Yes | Yes | No | No |
| Enter/update scores | Yes | Yes | No | No |
| Join league via invite code | — | — | Yes | — |
| Create team in league | — | — | Yes | — |
| Invite players to own team | — | — | Yes | No |
| View leagues/standings/rosters | Yes | Yes | Yes | Yes |
| Accept/decline team invite | — | — | — | Yes |
| Leave team | — | — | No (transfer) | Yes |

---

## Notes

- **"Yes"** means the role can perform the action.
- **"No"** means the role exists at that scope but is explicitly denied.
- **"—"** means the action does not apply to that role.
- **Captain leaving:** Captains cannot leave a team directly. They must transfer the captain role to another team member first.
- **Role inheritance:** Org Owners inherit all Org Admin permissions. Captains inherit all Player permissions within their own team.
- **Multi-role:** A user can hold different roles across different organizations (e.g., Owner of one org, Player in another).
