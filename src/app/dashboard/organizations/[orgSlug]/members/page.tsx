import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getOrgBySlug, getOrgMembers, getUserById, organizations } from "@/data";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const roleColors: Record<string, string> = {
  owner: "bg-amber-100 text-amber-800",
  admin: "bg-blue-100 text-blue-800",
  member: "",
};

export function generateStaticParams() {
  return organizations.map((org) => ({ orgSlug: org.slug }));
}

export default async function OrgMembersPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const org = getOrgBySlug(orgSlug);
  if (!org) notFound();

  const members = getOrgMembers(org.id);

  return (
    <div className="space-y-3">
      <Breadcrumbs
        items={[
          { label: "Organizations", href: "/dashboard/organizations" },
          { label: org.name, href: `/dashboard/organizations/${orgSlug}` },
          { label: "Members" },
        ]}
      />
      <div>
        <h1 className="text-lg font-semibold">{org.name} — Members</h1>
        <p className="text-sm text-muted-foreground">
          {members.length} members
        </p>
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
                  <Badge
                    variant="secondary"
                    className={roleColors[m.role]}
                  >
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
