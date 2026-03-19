import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  currentUser,
  getUserTeams,
  getUserUpcomingMatches,
  getLastResult,
  getTeamStanding,
  getTeamById,
} from "@/data";
import { Calendar, Swords, TrendingUp, ChevronRight } from "lucide-react";
import { formatDate, formatTime } from "@/lib/formatting";
import Link from "next/link";

export default function DashboardPage() {
  const teams = getUserTeams(currentUser.id);
  const upcoming = getUserUpcomingMatches(currentUser.id);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {currentUser.name.split(" ")[0]}
        </p>
      </div>

      {/* Upcoming Games */}
      <section>
        <h2 className="text-sm font-medium mb-2 flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          Upcoming Games
        </h2>
        {upcoming.length === 0 ? (
          <Card>
            <CardHeader className="p-3">
              <CardDescription className="text-xs">
                No upcoming games scheduled.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-2">
            {upcoming.map((item) => (
              <Link
                key={item.match.id}
                href={`/dashboard/organizations/${item.org.slug}/leagues/${item.league.slug}`}
                className="block"
              >
                <Card className="hover:bg-accent/50 transition-colors">
                  <CardHeader className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <CardTitle className="text-sm truncate">
                            {item.team.name}
                          </CardTitle>
                          <span className="text-xs text-muted-foreground">
                            vs
                          </span>
                          <span className="text-sm font-medium truncate">
                            {item.opponent.name}
                          </span>
                        </div>
                        <CardDescription className="text-xs mt-0.5">
                          {item.league.name} &middot; {item.isHome ? "Home" : "Away"}
                        </CardDescription>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="text-xs font-medium">
                          {formatDate(item.match.scheduledAt)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(item.match.scheduledAt)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Your Teams */}
      {teams.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              Your Teams
            </h2>
            <Link
              href="/dashboard/my-teams"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5"
            >
              View all
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {teams.map((team) => {
              const standing = getTeamStanding(team.id, team.league.id);
              const lastGame = getLastResult(team.id);
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
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <CardTitle className="text-sm truncate">
                            {team.name}
                          </CardTitle>
                          <CardDescription className="text-xs mt-0.5">
                            {team.league.name} &middot; {team.org.name}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {team.memberRole === "captain" && (
                            <Badge variant="outline" className="text-xs">
                              Cpt
                            </Badge>
                          )}
                          <Badge
                            variant={
                              team.league.status === "in_progress"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {team.league.status === "in_progress"
                              ? "Active"
                              : team.league.status === "registration"
                                ? "Reg"
                                : "Done"}
                          </Badge>
                        </div>
                      </div>

                      {/* Record + Last Result */}
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        {standing && (
                          <span className="font-medium text-foreground">
                            {standing.wins}-{standing.losses}
                            {standing.ties > 0 ? `-${standing.ties}` : ""}
                            <span className="text-muted-foreground font-normal ml-1">
                              #{standing.rank}
                            </span>
                          </span>
                        )}
                        {lastGame && lastOpponent && (
                          <span className="flex items-center gap-1">
                            <Swords className="h-3 w-3" />
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
        </section>
      )}
    </div>
  );
}
