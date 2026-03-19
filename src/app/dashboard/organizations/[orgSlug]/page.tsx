import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOrgBySlug, getOrgMembers, getLeaguesByOrg, organizations } from "@/data";
import { LeagueCard } from "@/components/league/league-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Users, Trophy, Settings } from "lucide-react";

export function generateStaticParams() {
  return organizations.map((org) => ({ orgSlug: org.slug }));
}

export default async function OrgOverviewPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const org = getOrgBySlug(orgSlug);
  if (!org) notFound();

  const members = getOrgMembers(org.id);
  const leagues = getLeaguesByOrg(org.id);

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: "Organizations", href: "/dashboard/organizations" },
          { label: org.name },
        ]}
      />
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold">{org.name}</h1>
          <p className="text-sm text-muted-foreground">{org.description}</p>
        </div>
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
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium">Leagues</h2>
          <Link href={`/dashboard/organizations/${orgSlug}/leagues`}>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              View all
            </Button>
          </Link>
        </div>
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
