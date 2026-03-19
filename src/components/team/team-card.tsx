import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Team } from "@/data/types";
import { getUserById, getTeamMembers } from "@/data";

export function TeamCard({
  team,
  href,
}: {
  team: Team;
  href: string;
}) {
  const captain = getUserById(team.captainId);
  const members = getTeamMembers(team.id);

  return (
    <Link href={href}>
      <Card className="hover:bg-accent/50 transition-colors">
        <CardHeader className="p-3">
          <CardTitle className="text-sm font-medium">{team.name}</CardTitle>
          <CardDescription className="text-xs mt-1">
            Captain: {captain?.name ?? "—"}
          </CardDescription>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Users className="h-3 w-3" />
            {members.length} players
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
