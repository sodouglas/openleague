import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Standing } from "@/data/types";
import { getTeamById } from "@/data";

export function StandingsTable({ standings }: { standings: Standing[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-xs">#</TableHead>
          <TableHead className="text-xs">Team</TableHead>
          <TableHead className="text-xs text-center">W</TableHead>
          <TableHead className="text-xs text-center">L</TableHead>
          <TableHead className="text-xs text-center">T</TableHead>
          <TableHead className="text-xs text-center">PF</TableHead>
          <TableHead className="text-xs text-center">PA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {standings.map((s) => {
          const team = getTeamById(s.teamId);
          return (
            <TableRow key={s.teamId}>
              <TableCell className="text-xs font-medium">{s.rank}</TableCell>
              <TableCell className="text-xs">{team?.name ?? "—"}</TableCell>
              <TableCell className="text-xs text-center">{s.wins}</TableCell>
              <TableCell className="text-xs text-center">{s.losses}</TableCell>
              <TableCell className="text-xs text-center">{s.ties}</TableCell>
              <TableCell className="text-xs text-center">{s.pointsFor}</TableCell>
              <TableCell className="text-xs text-center">{s.pointsAgainst}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
