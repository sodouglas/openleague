import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { League } from "@/data/types";
import { getOrgBySlug } from "@/data";
import { organizations } from "@/data";

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

export function LeagueCard({
  league,
  orgSlug,
}: {
  league: League;
  orgSlug: string;
}) {
  return (
    <Link
      href={`/dashboard/organizations/${orgSlug}/leagues/${league.slug}`}
    >
      <Card className="hover:bg-accent/50 transition-colors">
        <CardHeader className="p-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm font-medium">
              {league.name}
            </CardTitle>
            <Badge
              variant="secondary"
              className={`text-xs ${statusColors[league.status]}`}
            >
              {statusLabels[league.status]}
            </Badge>
          </div>
          <CardDescription className="text-xs mt-1">
            {sportLabels[league.sport]} &middot; {league.season} &middot;{" "}
            {league.bracketType.replace("_", " ")}
          </CardDescription>
          <div className="text-xs text-muted-foreground mt-1">
            {league.teams}/{league.maxTeams} teams
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
