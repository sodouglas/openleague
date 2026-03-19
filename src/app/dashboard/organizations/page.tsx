import { currentUser, getUserOrgs } from "@/data";
import { OrgCard } from "@/components/organization/org-card";

export default function OrganizationsPage() {
  const orgs = getUserOrgs(currentUser.id);

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Organizations</h1>
        <p className="text-sm text-muted-foreground">
          Organizations you belong to
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {orgs.map((org) => (
          <OrgCard key={org.id} org={org} />
        ))}
      </div>
    </div>
  );
}
