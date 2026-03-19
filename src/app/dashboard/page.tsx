import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { currentUser, getUserOrgs, getUserTeams } from "@/data";
import { Building2, Users, Trophy, Calendar } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const orgs = getUserOrgs(currentUser.id);
  const teams = getUserTeams(currentUser.id);
  const activeLeagues = teams.filter((t) => t.league.status === "in_progress");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {currentUser.name.split(" ")[0]}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Card>
          <CardHeader className="p-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <CardDescription className="text-xs">Organizations</CardDescription>
            </div>
            <CardTitle className="text-lg">{orgs.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <CardDescription className="text-xs">My Teams</CardDescription>
            </div>
            <CardTitle className="text-lg">{teams.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <CardDescription className="text-xs">Active Leagues</CardDescription>
            </div>
            <CardTitle className="text-lg">{activeLeagues.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <CardDescription className="text-xs">Upcoming</CardDescription>
            </div>
            <CardTitle className="text-lg">—</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-2">Your Organizations</h2>
        <div className="space-y-2">
          {orgs.map((org) => (
            <Link
              key={org.id}
              href={`/dashboard/organizations/${org.slug}`}
              className="block"
            >
              <Card className="hover:bg-accent/50 transition-colors">
                <CardHeader className="p-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{org.name}</CardTitle>
                    <span className="text-xs text-muted-foreground">{org.role}</span>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {teams.length > 0 && (
        <div>
          <h2 className="text-sm font-medium mb-2">Your Teams</h2>
          <div className="space-y-2">
            {teams.map((team) => (
              <Link
                key={team.id}
                href={`/dashboard/organizations/${team.org.slug}/leagues/${team.league.slug}/teams/${team.id}`}
                className="block"
              >
                <Card className="hover:bg-accent/50 transition-colors">
                  <CardHeader className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm">{team.name}</CardTitle>
                        <CardDescription className="text-xs mt-0.5">
                          {team.league.name} &middot; {team.org.name}
                        </CardDescription>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {team.memberRole}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
