import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Trophy } from "lucide-react";
import { Organization } from "@/data/types";
import { getOrgMembers, getLeaguesByOrg, getOrgMemberRole } from "@/data";
import { currentUser } from "@/data";

export function OrgCard({ org }: { org: Organization }) {
  const members = getOrgMembers(org.id);
  const leagues = getLeaguesByOrg(org.id);
  const role = getOrgMemberRole(currentUser.id, org.id);

  return (
    <Link href={`/dashboard/organizations/${org.slug}`}>
      <Card className="hover:bg-accent/50 transition-colors">
        <CardHeader className="p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">{org.name}</CardTitle>
            </div>
            {role && (
              <Badge variant="secondary" className="text-xs">
                {role}
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs mt-1">
            {org.description}
          </CardDescription>
          <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {members.length} members
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              {leagues.length} leagues
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
