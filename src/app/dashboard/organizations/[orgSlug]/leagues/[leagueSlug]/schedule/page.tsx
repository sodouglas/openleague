import { notFound } from "next/navigation";
import {
  getOrgBySlug,
  getLeagueBySlug,
  getMatchesByLeague,
  getRounds,
  organizations,
  leagues,
} from "@/data";
import { MatchCard } from "@/components/match/match-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export function generateStaticParams() {
  return leagues.map((league) => {
    const org = organizations.find((o) => o.id === league.orgId)!;
    return { orgSlug: org.slug, leagueSlug: league.slug };
  });
}

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ orgSlug: string; leagueSlug: string }>;
}) {
  const { orgSlug, leagueSlug } = await params;
  const org = getOrgBySlug(orgSlug);
  if (!org) notFound();

  const league = getLeagueBySlug(leagueSlug);
  if (!league || league.orgId !== org.id) notFound();

  const allMatches = getMatchesByLeague(league.id);
  const rounds = getRounds(league.id);

  const crumbs = [
    { label: "Organizations", href: "/dashboard/organizations" },
    { label: org.name, href: `/dashboard/organizations/${orgSlug}` },
    { label: league.name, href: `/dashboard/organizations/${orgSlug}/leagues/${leagueSlug}` },
    { label: "Schedule" },
  ];

  if (allMatches.length === 0) {
    return (
      <div className="space-y-3">
        <Breadcrumbs items={crumbs} />
        <div>
          <h1 className="text-lg font-semibold">{league.name} — Schedule</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          No matches scheduled yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Breadcrumbs items={crumbs} />
      <div>
        <h1 className="text-lg font-semibold">{league.name} — Schedule</h1>
        <p className="text-sm text-muted-foreground">
          {allMatches.length} matches across {rounds.length} rounds
        </p>
      </div>

      {rounds.map((round) => {
        const roundMatches = allMatches.filter((m) => m.round === round);
        return (
          <div key={round}>
            <h2 className="text-sm font-medium mb-2">Round {round}</h2>
            <div className="space-y-2">
              {roundMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
