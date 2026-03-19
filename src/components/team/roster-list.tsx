import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TeamMember } from "@/data/types";
import { getUserById } from "@/data";

export function RosterList({ members }: { members: TeamMember[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">Name</TableHead>
          <TableHead className="text-xs">Email</TableHead>
          <TableHead className="text-xs">Role</TableHead>
          <TableHead className="text-xs">Status</TableHead>
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
                  className={
                    m.role === "captain"
                      ? "bg-amber-100 text-amber-800"
                      : ""
                  }
                >
                  {m.role}
                </Badge>
              </TableCell>
              <TableCell className="text-xs">
                <Badge
                  variant="outline"
                  className={
                    m.status === "active"
                      ? "border-green-300 text-green-700"
                      : m.status === "invited"
                        ? "border-blue-300 text-blue-700"
                        : "border-red-300 text-red-700"
                  }
                >
                  {m.status}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
