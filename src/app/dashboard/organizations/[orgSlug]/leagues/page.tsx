import { notFound } from "next/navigation";
import { getOrgBySlug, getLeaguesByOrg, organizations } from "@/data";
import { LeagueCard } from "@/components/league/league-card";

export function generateStaticParams() {
  return organizations.map((org) => ({ orgSlug: org.slug }));
}

export default async function LeaguesPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const org = getOrgBySlug(orgSlug);
  if (!org) notFound();

  const leagues = getLeaguesByOrg(org.id);

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">{org.name} — Leagues</h1>
        <p className="text-sm text-muted-foreground">
          {leagues.length} leagues
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} orgSlug={orgSlug} />
        ))}
      </div>
    </div>
  );
}
