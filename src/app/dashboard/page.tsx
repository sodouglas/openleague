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

function getWeekLabel(date: Date, now: Date): string {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayOfWeek = startOfToday.getDay();
  const startOfThisWeek = new Date(startOfToday);
  startOfThisWeek.setDate(startOfToday.getDate() - dayOfWeek);

  const startOfNextWeek = new Date(startOfThisWeek);
  startOfNextWeek.setDate(startOfThisWeek.getDate() + 7);

  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 7);

  if (date >= startOfThisWeek && date < startOfNextWeek) return "This Week";
  if (date >= startOfNextWeek && date < endOfNextWeek) return "Next Week";
  return "Later";
}

export default function DashboardPage() {
  const teams = getUserTeams(currentUser.id);
  const allUpcoming = getUserUpcomingMatches(currentUser.id);

  const now = new Date("2026-03-19T12:00:00");
  const twoWeeksOut = new Date(now);
  twoWeeksOut.setDate(twoWeeksOut.getDate() + 14);

  const upcoming = allUpcoming.filter(
    (item) => new Date(item.match.scheduledAt) <= twoWeeksOut
  );

  const grouped = new Map<string, typeof upcoming>();
  for (const item of upcoming) {
    const label = getWeekLabel(new Date(item.match.scheduledAt), now);
    if (!grouped.has(label)) grouped.set(label, []);
    grouped.get(label)!.push(item);
  }

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
                No games in the next 2 weeks.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-4">
            {[...grouped.entries()].map(([weekLabel, games]) => (
              <div key={weekLabel}>
                <h3 className="text-xs font-medium text-muted-foreground mb-1.5">
                  {weekLabel}
                </h3>
                <div className="space-y-2">
                  {games.map((item) => {
                    const gameDate = new Date(item.match.scheduledAt);
                    const dayAbbr = gameDate
                      .toLocaleDateString("en-US", { weekday: "short" })
                      .toUpperCase();
                    const dayNum = gameDate.getDate();

                    return (
                      <Link
                        key={item.match.id}
                        href={`/dashboard/organizations/${item.org.slug}/leagues/${item.league.slug}`}
                        className="block"
                      >
                        <Card className="hover:bg-accent/50 transition-colors border-l-[3px] border-l-foreground/20">
                          <CardHeader className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col items-center justify-center shrink-0 w-10 text-center">
                                <span className="text-[10px] uppercase tracking-wide text-muted-foreground leading-none">
                                  {dayAbbr}
                                </span>
                                <span className="text-lg font-semibold leading-none mt-0.5">
                                  {dayNum}
                                </span>
                                <span className="text-[10px] text-muted-foreground leading-none mt-1">
                                  {formatTime(item.match.scheduledAt)}
                                </span>
                              </div>
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
                                  {item.league.name} &middot;{" "}
                                  {item.isHome ? "Home" : "Away"}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
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
          <div className="@container">
          <div className="grid gap-2 @lg:grid-cols-2">
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
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center justify-center rounded-md bg-muted px-2.5 py-1.5 shrink-0 min-w-14">
                          {standing ? (
                            <>
                              <span className="text-base font-semibold tabular-nums leading-none">
                                {standing.wins}-{standing.losses}
                                {standing.ties > 0 ? `-${standing.ties}` : ""}
                              </span>
                              <span className="text-[10px] text-muted-foreground mt-1">
                                #{standing.rank}
                              </span>
                            </>
                          ) : (
                            <span className="text-[10px] font-medium text-muted-foreground uppercase">
                              {team.league.status === "registration"
                                ? "Reg"
                                : "—"}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm truncate">
                              {team.name}
                            </CardTitle>
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
                          <CardDescription className="text-xs mt-0.5">
                            {team.league.name} &middot; {team.org.name}
                          </CardDescription>
                          {lastGame && lastOpponent && (
                            <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
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
                                : `${lastGame.awayScore}-${lastGame.homeScore}`}{" "}
                              vs {lastOpponent.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
          </div>
        </section>
      )}
    </div>
  );
}
