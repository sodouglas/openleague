import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { currentUser, getUserTeams } from "@/data";

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

export default function MyTeamsPage() {
  const teams = getUserTeams(currentUser.id);

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">My Teams</h1>
        <p className="text-sm text-muted-foreground">
          Teams you belong to across all leagues
        </p>
      </div>

      {teams.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You are not on any teams yet.{" "}
          <Link href="/dashboard/join" className="text-foreground underline">
            Join a league
          </Link>{" "}
          to get started.
        </p>
      ) : (
        <div className="space-y-2">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/dashboard/organizations/${team.org.slug}/leagues/${team.league.slug}/teams/${team.id}`}
              className="block"
            >
              <Card className="hover:bg-accent/50 transition-colors">
                <CardHeader className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-sm">{team.name}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {team.league.name} &middot; {team.org.name}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="secondary"
                        className={statusColors[team.league.status]}
                      >
                        {statusLabels[team.league.status]}
                      </Badge>
                      {team.memberRole === "captain" && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                          captain
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
