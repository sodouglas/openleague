import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  getOrgBySlug,
  getLeagueBySlug,
  getTeamsByLeague,
  getStandingsByLeague,
  getMatchesByLeague,
  getRounds,
  organizations,
  leagues,
} from "@/data";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LeagueTabs } from "@/components/league/league-tabs";

const statusColors: Record<string, string> = {
  registration: "bg-blue-100 text-blue-800",
  in_progress: "bg-green-100 text-green-800",
  completed: "bg-neutral-100 text-neutral-600",
};

const statusLabels: Record<string, string> = {
  registration: "Registration",
  in_progress: "In Progress",
  completed: "Completed",
};

const sportLabels: Record<string, string> = {
  basketball: "Basketball",
  soccer: "Soccer",
  volleyball: "Volleyball",
  softball: "Softball",
  flag_football: "Flag Football",
};

export function generateStaticParams() {
  return leagues.map((league) => {
    const org = organizations.find((o) => o.id === league.orgId)!;
    return { orgSlug: org.slug, leagueSlug: league.slug };
  });
}

export default async function LeagueOverviewPage({
  params,
}: {
  params: Promise<{ orgSlug: string; leagueSlug: string }>;
}) {
  const { orgSlug, leagueSlug } = await params;
  const org = getOrgBySlug(orgSlug);
  if (!org) notFound();

  const league = getLeagueBySlug(leagueSlug, org.id);
  if (!league || league.orgId !== org.id) notFound();

  const leagueTeams = getTeamsByLeague(league.id);
  const leagueStandings = getStandingsByLeague(league.id);
  const allMatches = getMatchesByLeague(league.id);
  const rounds = getRounds(league.id);

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: "Organizations", href: "/dashboard/organizations" },
          { label: org.name, href: `/dashboard/organizations/${orgSlug}` },
          { label: league.name },
        ]}
      />

      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{league.name}</h1>
          <Badge
            variant="secondary"
            className={statusColors[league.status]}
          >
            {statusLabels[league.status]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {sportLabels[league.sport]} &middot; {league.season} &middot;{" "}
          {league.bracketType.replace("_", " ")}
        </p>
        {league.status === "registration" && (
          <p className="text-xs text-muted-foreground mt-1">
            Invite code: <code className="bg-muted px-1 py-0.5 rounded-[2px]">{league.inviteCode}</code>
          </p>
        )}
      </div>

      <LeagueTabs
        league={league}
        teams={leagueTeams}
        standings={leagueStandings}
        matches={allMatches}
        rounds={rounds}
        orgSlug={orgSlug}
      />
    </div>
  );
}
