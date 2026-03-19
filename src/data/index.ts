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

export function getNextMatch(teamId: string) {
  return matches
    .filter(
      (m) =>
        (m.homeTeamId === teamId || m.awayTeamId === teamId) &&
        m.status === "scheduled"
    )
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];
}

export function getLastResult(teamId: string) {
  return matches
    .filter(
      (m) =>
        (m.homeTeamId === teamId || m.awayTeamId === teamId) &&
        m.status === "completed"
    )
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())[0];
}

export function getTeamStanding(teamId: string, leagueId: string) {
  return standings.find((s) => s.teamId === teamId && s.leagueId === leagueId);
}

export function getUserUpcomingMatches(userId: string) {
  const userTeams = getUserTeams(userId);
  return userTeams
    .map((team) => {
      const next = getNextMatch(team.id);
      if (!next) return null;
      const opponentId = next.homeTeamId === team.id ? next.awayTeamId : next.homeTeamId;
      const opponent = teams.find((t) => t.id === opponentId)!;
      const league = leagues.find((l) => l.id === team.leagueId)!;
      const org = organizations.find((o) => o.id === league.orgId)!;
      const isHome = next.homeTeamId === team.id;
      return { match: next, team, opponent, league, org, isHome };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(a!.match.scheduledAt).getTime() - new Date(b!.match.scheduledAt).getTime()) as {
      match: typeof matches[number];
      team: typeof userTeams[number];
      opponent: typeof teams[number];
      league: typeof leagues[number];
      org: typeof organizations[number];
      isHome: boolean;
    }[];
}
