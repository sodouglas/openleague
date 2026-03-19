import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  getOrgBySlug,
  getLeagueBySlug,
  getTeamsByLeague,
  getStandingsByLeague,
  getMatchesByLeague,
  organizations,
  leagues,
} from "@/data";
import { StandingsTable } from "@/components/league/standings-table";
import { Users, Calendar, ListOrdered, ClipboardList } from "lucide-react";

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

  const league = getLeagueBySlug(leagueSlug);
  if (!league || league.orgId !== org.id) notFound();

  const leagueTeams = getTeamsByLeague(league.id);
  const leagueStandings = getStandingsByLeague(league.id);
  const leagueMatches = getMatchesByLeague(league.id);
  const basePath = `/dashboard/organizations/${orgSlug}/leagues/${leagueSlug}`;

  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-3 gap-2">
        <Link href={`${basePath}/teams`}>
          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <CardDescription className="text-xs">Teams</CardDescription>
              </div>
              <CardTitle className="text-lg">
                {leagueTeams.length}/{league.maxTeams}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href={`${basePath}/schedule`}>
          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <CardDescription className="text-xs">Matches</CardDescription>
              </div>
              <CardTitle className="text-lg">{leagueMatches.length}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href={`${basePath}/standings`}>
          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-3">
              <div className="flex items-center gap-2">
                <ListOrdered className="h-4 w-4 text-muted-foreground" />
                <CardDescription className="text-xs">Standings</CardDescription>
              </div>
              <CardTitle className="text-lg">
                {leagueStandings.length > 0 ? "View" : "—"}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {leagueStandings.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium">Standings</h2>
            <Link
              href={`${basePath}/standings`}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View full
            </Link>
          </div>
          <StandingsTable standings={leagueStandings} />
        </div>
      )}
    </div>
  );
}
