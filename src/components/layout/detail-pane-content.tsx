"use client";

import { parseRoute } from "@/lib/route-parser";
import {
  getOrgBySlug,
  getOrgMembers,
  getLeaguesByOrg,
  getLeagueBySlug,
  getTeamsByLeague,
  getStandingsByLeague,
  getMatchesByLeague,
  getRounds,
  getTeamById,
  getTeamMembers,
  getUserById,
} from "@/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeagueCard } from "@/components/league/league-card";
import { LeagueTabs } from "@/components/league/league-tabs";
import { RosterList } from "@/components/team/roster-list";
import { Users, Trophy } from "lucide-react";
import Link from "next/link";

const roleColors: Record<string, string> = {
  owner: "bg-amber-100 text-amber-800",
  admin: "bg-blue-100 text-blue-800",
  member: "",
};

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

export function DetailPaneContent({ path }: { path: string }) {
  const route = parseRoute(path);
  if (!route) return <NotFound />;

  switch (route.type) {
    case "org-overview":
      return <OrgOverview orgSlug={route.orgSlug} />;
    case "org-members":
      return <OrgMembers orgSlug={route.orgSlug} />;
    case "org-leagues":
      return <OrgLeagues orgSlug={route.orgSlug} />;
    case "league-overview":
      return (
        <LeagueOverview
          orgSlug={route.orgSlug}
          leagueSlug={route.leagueSlug}
          defaultTab={route.tab}
        />
      );
    case "team-detail":
      return (
        <TeamDetail
          orgSlug={route.orgSlug}
          leagueSlug={route.leagueSlug}
          teamId={route.teamId}
        />
      );
  }
}

function NotFound() {
  return (
    <p className="text-sm text-muted-foreground py-4">Page not found.</p>
  );
}

function OrgOverview({ orgSlug }: { orgSlug: string }) {
  const org = getOrgBySlug(orgSlug);
  if (!org) return <NotFound />;

  const members = getOrgMembers(org.id);
  const leagues = getLeaguesByOrg(org.id);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{org.name}</h2>
        <p className="text-sm text-muted-foreground">{org.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Link href={`/dashboard/organizations/${orgSlug}/members`}>
          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <CardDescription className="text-xs">Members</CardDescription>
              </div>
              <CardTitle className="text-lg">{members.length}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href={`/dashboard/organizations/${orgSlug}/leagues`}>
          <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="p-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <CardDescription className="text-xs">Leagues</CardDescription>
              </div>
              <CardTitle className="text-lg">{leagues.length}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Leagues</h3>
        <div className="@container">
          <div className="grid gap-2 @lg:grid-cols-2">
            {leagues.slice(0, 4).map((league) => (
              <LeagueCard key={league.id} league={league} orgSlug={orgSlug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrgMembers({ orgSlug }: { orgSlug: string }) {
  const org = getOrgBySlug(orgSlug);
  if (!org) return <NotFound />;

  const members = getOrgMembers(org.id);

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">{org.name} — Members</h2>
        <p className="text-sm text-muted-foreground">{members.length} members</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Name</TableHead>
            <TableHead className="text-xs">Email</TableHead>
            <TableHead className="text-xs">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((m) => {
            const user = getUserById(m.userId);
            return (
              <TableRow key={m.userId}>
                <TableCell className="text-xs">{user?.name ?? "—"}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {user?.email ?? "—"}
                </TableCell>
                <TableCell className="text-xs">
                  <Badge variant="secondary" className={roleColors[m.role]}>
                    {m.role}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function OrgLeagues({ orgSlug }: { orgSlug: string }) {
  const org = getOrgBySlug(orgSlug);
  if (!org) return <NotFound />;

  const leagues = getLeaguesByOrg(org.id);

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">{org.name} — Leagues</h2>
        <p className="text-sm text-muted-foreground">{leagues.length} leagues</p>
      </div>
      <div className="@container">
        <div className="grid gap-2 @lg:grid-cols-2">
          {leagues.map((league) => (
            <LeagueCard key={league.id} league={league} orgSlug={orgSlug} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LeagueOverview({
  orgSlug,
  leagueSlug,
  defaultTab,
}: {
  orgSlug: string;
  leagueSlug: string;
  defaultTab?: "standings" | "schedule" | "teams";
}) {
  const org = getOrgBySlug(orgSlug);
  if (!org) return <NotFound />;

  const league = getLeagueBySlug(leagueSlug, org.id);
  if (!league) return <NotFound />;

  const leagueTeams = getTeamsByLeague(league.id);
  const leagueStandings = getStandingsByLeague(league.id);
  const allMatches = getMatchesByLeague(league.id);
  const rounds = getRounds(league.id);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{league.name}</h2>
          <Badge variant="secondary" className={statusColors[league.status]}>
            {statusLabels[league.status]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {sportLabels[league.sport]} &middot; {league.season} &middot;{" "}
          {league.bracketType.replace("_", " ")}
        </p>
        {league.status === "registration" && (
          <p className="text-xs text-muted-foreground mt-1">
            Invite code:{" "}
            <code className="bg-muted px-1 py-0.5 rounded-[2px]">
              {league.inviteCode}
            </code>
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
        defaultTab={defaultTab}
      />
    </div>
  );
}

function TeamDetail({
  orgSlug,
  leagueSlug,
  teamId,
}: {
  orgSlug: string;
  leagueSlug: string;
  teamId: string;
}) {
  const org = getOrgBySlug(orgSlug);
  if (!org) return <NotFound />;

  const league = getLeagueBySlug(leagueSlug, org.id);
  if (!league) return <NotFound />;

  const team = getTeamById(teamId);
  if (!team || team.leagueId !== league.id) return <NotFound />;

  const members = getTeamMembers(team.id);
  const captain = getUserById(team.captainId);

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">{team.name}</h2>
        <p className="text-sm text-muted-foreground">
          {league.name} &middot; Captain: {captain?.name ?? "—"}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">
          Roster ({members.length} players)
        </h3>
        <RosterList members={members} />
      </div>
    </div>
  );
}
