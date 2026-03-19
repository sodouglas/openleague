type OrgOverviewRoute = {
  type: "org-overview";
  orgSlug: string;
};

type OrgMembersRoute = {
  type: "org-members";
  orgSlug: string;
};

type OrgLeaguesRoute = {
  type: "org-leagues";
  orgSlug: string;
};

type LeagueOverviewRoute = {
  type: "league-overview";
  orgSlug: string;
  leagueSlug: string;
  tab?: "standings" | "schedule" | "teams";
};

type TeamDetailRoute = {
  type: "team-detail";
  orgSlug: string;
  leagueSlug: string;
  teamId: string;
};

export type ParsedRoute =
  | OrgOverviewRoute
  | OrgMembersRoute
  | OrgLeaguesRoute
  | LeagueOverviewRoute
  | TeamDetailRoute;

export function parseRoute(path: string): ParsedRoute | null {
  const segments = path.replace(/\/$/, "").split("/").filter(Boolean);

  // Expected: ["dashboard", "organizations", orgSlug, ...]
  if (segments.length < 3 || segments[0] !== "dashboard" || segments[1] !== "organizations") {
    return null;
  }

  const orgSlug = segments[2];

  // /dashboard/organizations/:orgSlug
  if (segments.length === 3) {
    return { type: "org-overview", orgSlug };
  }

  // /dashboard/organizations/:orgSlug/members
  if (segments.length === 4 && segments[3] === "members") {
    return { type: "org-members", orgSlug };
  }

  // /dashboard/organizations/:orgSlug/leagues
  if (segments.length === 4 && segments[3] === "leagues") {
    return { type: "org-leagues", orgSlug };
  }

  if (segments.length < 5 || segments[3] !== "leagues") {
    return null;
  }

  const leagueSlug = segments[4];

  // /dashboard/organizations/:orgSlug/leagues/:leagueSlug
  if (segments.length === 5) {
    return { type: "league-overview", orgSlug, leagueSlug };
  }

  // /dashboard/organizations/:orgSlug/leagues/:leagueSlug/standings|schedule|teams
  if (segments.length === 6) {
    const sub = segments[5];
    if (sub === "standings" || sub === "schedule" || sub === "teams") {
      return { type: "league-overview", orgSlug, leagueSlug, tab: sub };
    }
  }

  // /dashboard/organizations/:orgSlug/leagues/:leagueSlug/teams/:teamId
  if (segments.length === 7 && segments[5] === "teams") {
    return { type: "team-detail", orgSlug, leagueSlug, teamId: segments[6] };
  }

  return null;
}
