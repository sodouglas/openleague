"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Match, Team } from "@/data/types";
import { getTeamById } from "@/data";

type BracketMatch = {
  match: Match;
  home: Team | undefined;
  away: Team | undefined;
};

function groupByRound(matches: Match[]): Map<number, BracketMatch[]> {
  const grouped = new Map<number, BracketMatch[]>();
  for (const match of matches) {
    const round = match.round;
    if (!grouped.has(round)) grouped.set(round, []);
    grouped.get(round)!.push({
      match,
      home: getTeamById(match.homeTeamId),
      away: getTeamById(match.awayTeamId),
    });
  }
  return grouped;
}

function roundLabel(round: number, totalRounds: number): string {
  const remaining = totalRounds - round;
  if (remaining === 0) return "Final";
  if (remaining === 1) return "Semifinals";
  if (remaining === 2) return "Quarterfinals";
  return `Round ${round}`;
}

function MatchSlot({ bracketMatch }: { bracketMatch: BracketMatch }) {
  const { match, home, away } = bracketMatch;
  const isCompleted = match.status === "completed";
  const homeWon =
    isCompleted &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.homeScore > match.awayScore;
  const awayWon =
    isCompleted &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.awayScore > match.homeScore;

  return (
    <Card className="w-48 shrink-0 overflow-hidden">
      <div
        className={`flex items-center justify-between px-2 py-1.5 text-xs border-b ${homeWon ? "bg-green-50" : ""}`}
      >
        <span className={homeWon ? "font-semibold" : ""}>
          {home?.name ?? "TBD"}
        </span>
        {isCompleted && (
          <span className={`font-mono tabular-nums ${homeWon ? "font-semibold" : "text-muted-foreground"}`}>
            {match.homeScore}
          </span>
        )}
      </div>
      <div
        className={`flex items-center justify-between px-2 py-1.5 text-xs ${awayWon ? "bg-green-50" : ""}`}
      >
        <span className={awayWon ? "font-semibold" : ""}>
          {away?.name ?? "TBD"}
        </span>
        {isCompleted && (
          <span className={`font-mono tabular-nums ${awayWon ? "font-semibold" : "text-muted-foreground"}`}>
            {match.awayScore}
          </span>
        )}
      </div>
    </Card>
  );
}

export function BracketView({ matches }: { matches: Match[] }) {
  const roundMap = groupByRound(matches);
  const sortedRounds = [...roundMap.keys()].sort((a, b) => a - b);
  const totalRounds = sortedRounds.length;

  if (matches.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        Bracket will appear once matches are scheduled.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 min-w-max py-2">
        {sortedRounds.map((round) => {
          const roundMatches = roundMap.get(round)!;
          const label = roundLabel(round, totalRounds);

          return (
            <div key={round} className="flex flex-col items-center">
              <Badge variant="outline" className="mb-3 text-xs">
                {label}
              </Badge>
              <div className="flex flex-col justify-around gap-4 flex-1">
                {roundMatches.map((bm) => (
                  <MatchSlot key={bm.match.id} bracketMatch={bm} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
