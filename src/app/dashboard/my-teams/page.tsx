import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Swords } from "lucide-react";
import {
  currentUser,
  getUserTeams,
  getNextMatch,
  getLastResult,
  getTeamStanding,
  getTeamById,
} from "@/data";
import { formatDate, formatTime } from "@/lib/formatting";

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
          {teams.map((team) => {
            const standing = getTeamStanding(team.id, team.league.id);
            const nextMatch = getNextMatch(team.id);
            const lastGame = getLastResult(team.id);
            const nextOpponent = nextMatch
              ? getTeamById(
                  nextMatch.homeTeamId === team.id
                    ? nextMatch.awayTeamId
                    : nextMatch.homeTeamId
                )
              : null;
            const lastOpponent = lastGame
              ? getTeamById(
                  lastGame.homeTeamId === team.id
                    ? lastGame.awayTeamId
                    : lastGame.homeTeamId
                )
              : null;
            const isLastGameWin = lastGame
              ? lastGame.homeTeamId === team.id
                ? (lastGame.homeScore ?? 0) > (lastGame.awayScore ?? 0)
                : (lastGame.awayScore ?? 0) > (lastGame.homeScore ?? 0)
              : false;
            const lastGameTied = lastGame
              ? lastGame.homeScore === lastGame.awayScore
              : false;

            return (
              <Link
                key={team.id}
                href={`/dashboard/organizations/${team.org.slug}/leagues/${team.league.slug}`}
                className="block"
              >
                <Card className="hover:bg-accent/50 transition-colors">
                  <CardHeader className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <CardTitle className="text-sm truncate">
                          {team.name}
                        </CardTitle>
                        <CardDescription className="text-xs mt-0.5">
                          {team.league.name} &middot; {team.org.name}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">

                        <Badge
                          variant={
                            team.league.status === "in_progress"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {statusLabels[team.league.status]}
                        </Badge>
                      </div>
                    </div>

                    {/* Record */}
                    {standing && (
                      <div className="mt-2 text-xs">
                        <span className="font-medium">
                          {standing.wins}-{standing.losses}
                          {standing.ties > 0 ? `-${standing.ties}` : ""}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          #{standing.rank} in league
                        </span>
                      </div>
                    )}

                    {/* Next game + Last result */}
                    <div className="flex flex-col gap-1 mt-2 text-xs text-muted-foreground">
                      {nextMatch && nextOpponent && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 shrink-0" />
                          Next: vs {nextOpponent.name} &middot;{" "}
                          {formatDate(nextMatch.scheduledAt)},{" "}
                          {formatTime(nextMatch.scheduledAt)}
                        </span>
                      )}
                      {lastGame && lastOpponent && (
                        <span className="flex items-center gap-1.5">
                          <Swords className="h-3 w-3 shrink-0" />
                          Last:{" "}
                          <span
                            className={
                              lastGameTied
                                ? ""
                                : isLastGameWin
                                  ? "text-green-600"
                                  : "text-red-600"
                            }
                          >
                            {lastGameTied ? "T" : isLastGameWin ? "W" : "L"}
                          </span>
                          {lastGame.homeTeamId === team.id
                            ? `${lastGame.homeScore}-${lastGame.awayScore}`
                            : `${lastGame.awayScore}-${lastGame.homeScore}`}
                          vs {lastOpponent.name}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
