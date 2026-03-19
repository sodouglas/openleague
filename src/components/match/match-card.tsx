import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match } from "@/data/types";
import { getTeamById } from "@/data";
import { formatDateTime } from "@/lib/formatting";

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  in_progress: "bg-green-100 text-green-800",
  completed: "bg-neutral-100 text-neutral-600",
};

export function MatchCard({ match }: { match: Match }) {
  const home = getTeamById(match.homeTeamId);
  const away = getTeamById(match.awayTeamId);

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className={match.status === "completed" && match.homeScore !== undefined && match.awayScore !== undefined && match.homeScore > match.awayScore ? "font-semibold" : ""}>
              {home?.name ?? "TBD"}
            </span>
            {match.status === "completed" ? (
              <span className="text-sm font-mono tabular-nums">
                {match.homeScore}
              </span>
            ) : null}
          </div>
          <div className="flex items-center justify-between text-sm mt-0.5">
            <span className={match.status === "completed" && match.homeScore !== undefined && match.awayScore !== undefined && match.awayScore > match.homeScore ? "font-semibold" : ""}>
              {away?.name ?? "TBD"}
            </span>
            {match.status === "completed" ? (
              <span className="text-sm font-mono tabular-nums">
                {match.awayScore}
              </span>
            ) : null}
          </div>
        </div>
        <div className="ml-3 flex flex-col items-end gap-1">
          <Badge variant="secondary" className={`text-xs ${statusColors[match.status]}`}>
            {match.status === "in_progress" ? "Live" : match.status}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDateTime(match.scheduledAt)}
          </span>
        </div>
      </div>
    </Card>
  );
}
