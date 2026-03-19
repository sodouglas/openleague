export { users, currentUser } from "./users";
export { organizations, orgMembers } from "./organizations";
export { leagues } from "./leagues";
export { teams, teamMembers } from "./teams";
export { matches } from "./matches";
export { standings } from "./standings";
export type {
  Organization,
  User,
  OrgMember,
  League,
  Team,
  TeamMember,
  Match,
  Standing,
  LeagueStatus,
  BracketType,
  Sport,
  MatchStatus,
} from "./types";

import { users } from "./users";
import { organizations, orgMembers } from "./organizations";
import { leagues } from "./leagues";
import { teams, teamMembers } from "./teams";
import { matches } from "./matches";
import { standings } from "./standings";

export function getUserById(id: string) {
  return users.find((u) => u.id === id);
}

export function getOrgBySlug(slug: string) {
  return organizations.find((o) => o.slug === slug);
}

export function getOrgMembers(orgId: string) {
  return orgMembers.filter((m) => m.orgId === orgId);
}

export function getUserOrgs(userId: string) {
  const memberOf = orgMembers.filter((m) => m.userId === userId);
  return memberOf.map((m) => ({
    ...organizations.find((o) => o.id === m.orgId)!,
    role: m.role,
  }));
}

export function getLeaguesByOrg(orgId: string) {
  return leagues.filter((l) => l.orgId === orgId);
}

export function getLeagueBySlug(slug: string) {
  return leagues.find((l) => l.slug === slug);
}

export function getTeamsByLeague(leagueId: string) {
  return teams.filter((t) => t.leagueId === leagueId);
}

export function getTeamById(teamId: string) {
  return teams.find((t) => t.id === teamId);
}

export function getTeamMembers(teamId: string) {
  return teamMembers.filter((m) => m.teamId === teamId);
}

export function getMatchesByLeague(leagueId: string) {
  return matches.filter((m) => m.leagueId === leagueId);
}

export function getMatchesByRound(leagueId: string, round: number) {
  return matches.filter((m) => m.leagueId === leagueId && m.round === round);
}

export function getStandingsByLeague(leagueId: string) {
  return standings
    .filter((s) => s.leagueId === leagueId)
    .sort((a, b) => a.rank - b.rank);
}

export function getUserTeams(userId: string) {
  const memberships = teamMembers.filter((m) => m.userId === userId && m.status === "active");
  return memberships.map((m) => {
    const team = teams.find((t) => t.id === m.teamId)!;
    const league = leagues.find((l) => l.id === team.leagueId)!;
    const org = organizations.find((o) => o.id === league.orgId)!;
    return { ...team, league, org, memberRole: m.role };
  });
}

export function getOrgMemberRole(userId: string, orgId: string) {
  return orgMembers.find((m) => m.userId === userId && m.orgId === orgId)?.role;
}

export function getRounds(leagueId: string): number[] {
  const leagueMatches = matches.filter((m) => m.leagueId === leagueId);
  return [...new Set(leagueMatches.map((m) => m.round))].sort((a, b) => a - b);
}
