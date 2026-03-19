import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  getOrgBySlug,
  getLeagueBySlug,
  getTeamById,
  getTeamMembers,
  getUserById,
  organizations,
  leagues,
  teams,
} from "@/data";
import { RosterList } from "@/components/team/roster-list";

export function generateStaticParams() {
  return teams.map((team) => {
    const league = leagues.find((l) => l.id === team.leagueId)!;
    const org = organizations.find((o) => o.id === league.orgId)!;
    return { orgSlug: org.slug, leagueSlug: league.slug, teamId: team.id };
  });
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ orgSlug: string; leagueSlug: string; teamId: string }>;
}) {
  const { orgSlug, leagueSlug, teamId } = await params;
  const org = getOrgBySlug(orgSlug);
  if (!org) notFound();

  const league = getLeagueBySlug(leagueSlug);
  if (!league || league.orgId !== org.id) notFound();

  const team = getTeamById(teamId);
  if (!team || team.leagueId !== league.id) notFound();

  const members = getTeamMembers(team.id);
  const captain = getUserById(team.captainId);

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">{team.name}</h1>
        <p className="text-sm text-muted-foreground">
          {league.name} &middot; Captain: {captain?.name ?? "—"}
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">
          Roster ({members.length} players)
        </h2>
        <RosterList members={members} />
      </div>
    </div>
  );
}
