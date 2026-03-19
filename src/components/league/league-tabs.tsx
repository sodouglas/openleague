"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StandingsTable } from "@/components/league/standings-table";
import { MatchCard } from "@/components/match/match-card";
import { TeamCard } from "@/components/team/team-card";
import { BracketView } from "@/components/league/bracket-view";
import type { League, Team, Standing, Match } from "@/data/types";

export function LeagueTabs({
  league,
  teams,
  standings,
  matches,
  rounds,
  orgSlug,
  defaultTab,
}: {
  league: League;
  teams: Team[];
  standings: Standing[];
  matches: Match[];
  rounds: number[];
  orgSlug: string;
  defaultTab?: "standings" | "schedule" | "teams";
}) {
  const basePath = `/dashboard/organizations/${orgSlug}/leagues/${league.slug}`;
  const hasStandings = standings.length > 0;
  const hasMatches = matches.length > 0;
  const isElimination =
    league.bracketType === "single_elimination" ||
    league.bracketType === "double_elimination";

  const [tab, setTab] = useState(defaultTab ?? (hasStandings ? "standings" : "schedule"));

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList variant="line">
        <TabsTrigger value="standings">Standings</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="teams">Teams</TabsTrigger>
        {isElimination && <TabsTrigger value="bracket">Bracket</TabsTrigger>}
      </TabsList>

      <TabsContent value="standings" className="mt-3">
        {hasStandings ? (
          <StandingsTable standings={standings} basePath={basePath} />
        ) : (
          <p className="text-sm text-muted-foreground py-4">
            No standings available yet.
          </p>
        )}
      </TabsContent>

      <TabsContent value="schedule" className="mt-3">
        {hasMatches ? (
          <div className="space-y-4">
            {rounds.map((round) => {
              const roundMatches = matches.filter((m) => m.round === round);
              return (
                <div key={round}>
                  <h3 className="text-sm font-medium mb-2">Round {round}</h3>
                  <div className="space-y-2">
                    {roundMatches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">
            No matches scheduled yet.
          </p>
        )}
      </TabsContent>

      <TabsContent value="teams" className="mt-3">
        <p className="text-xs text-muted-foreground mb-2">
          {teams.length}/{league.maxTeams} teams
        </p>
        <div className="@container">
          <div className="grid gap-2 @lg:grid-cols-2">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                href={`${basePath}/teams/${team.id}`}
              />
            ))}
          </div>
        </div>
      </TabsContent>

      {isElimination && (
        <TabsContent value="bracket" className="mt-3">
          <BracketView matches={matches} />
        </TabsContent>
      )}
    </Tabs>
  );
}
