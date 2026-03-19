import { notFound } from "next/navigation";
import {
  getOrgBySlug,
  getLeagueBySlug,
  getStandingsByLeague,
  organizations,
  leagues,
} from "@/data";
import { StandingsTable } from "@/components/league/standings-table";

export function generateStaticParams() {
  return leagues.map((league) => {
    const org = organizations.find((o) => o.id === league.orgId)!;
    return { orgSlug: org.slug, leagueSlug: league.slug };
  });
}

export default async function StandingsPage({
  params,
}: {
  params: Promise<{ orgSlug: string; leagueSlug: string }>;
}) {
  const { orgSlug, leagueSlug } = await params;
  const org = getOrgBySlug(orgSlug);
  if (!org) notFound();

  const league = getLeagueBySlug(leagueSlug);
  if (!league || league.orgId !== org.id) notFound();

  const leagueStandings = getStandingsByLeague(league.id);

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">{league.name} — Standings</h1>
      </div>

      {leagueStandings.length > 0 ? (
        <StandingsTable standings={leagueStandings} />
      ) : (
        <p className="text-sm text-muted-foreground">
          No standings available yet.
        </p>
      )}
    </div>
  );
}
