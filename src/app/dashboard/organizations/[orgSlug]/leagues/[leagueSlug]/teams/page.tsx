import { notFound } from "next/navigation";
import {
  getOrgBySlug,
  getLeagueBySlug,
  getTeamsByLeague,
  organizations,
  leagues,
} from "@/data";
import { TeamCard } from "@/components/team/team-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export function generateStaticParams() {
  return leagues.map((league) => {
    const org = organizations.find((o) => o.id === league.orgId)!;
    return { orgSlug: org.slug, leagueSlug: league.slug };
  });
}

export default async function TeamsPage({
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

  return (
    <div className="space-y-3">
      <Breadcrumbs
        items={[
          { label: "Organizations", href: "/dashboard/organizations" },
          { label: org.name, href: `/dashboard/organizations/${orgSlug}` },
          { label: league.name, href: `/dashboard/organizations/${orgSlug}/leagues/${leagueSlug}` },
          { label: "Teams" },
        ]}
      />
      <div>
        <h1 className="text-lg font-semibold">{league.name} — Teams</h1>
        <p className="text-sm text-muted-foreground">
          {leagueTeams.length}/{league.maxTeams} teams
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {leagueTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            href={`/dashboard/organizations/${orgSlug}/leagues/${leagueSlug}/teams/${team.id}`}
          />
        ))}
      </div>
    </div>
  );
}
