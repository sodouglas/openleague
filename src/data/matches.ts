import { Match } from "./types";

// Round robin: 8 teams = 7 rounds, 4 games per round = 28 games total
// Rounds 1-4 completed, Round 5 in progress, Rounds 6-7 scheduled
export const matches: Match[] = [
  // Round 1 — completed
  { id: "m1", leagueId: "lg1", homeTeamId: "t1", awayTeamId: "t2", round: 1, homeScore: 48, awayScore: 42, status: "completed", scheduledAt: "2026-02-02T18:00:00" },
  { id: "m2", leagueId: "lg1", homeTeamId: "t3", awayTeamId: "t4", round: 1, homeScore: 55, awayScore: 51, status: "completed", scheduledAt: "2026-02-02T19:00:00" },
  { id: "m3", leagueId: "lg1", homeTeamId: "t5", awayTeamId: "t6", round: 1, homeScore: 38, awayScore: 44, status: "completed", scheduledAt: "2026-02-02T20:00:00" },
  { id: "m4", leagueId: "lg1", homeTeamId: "t7", awayTeamId: "t8", round: 1, homeScore: 61, awayScore: 53, status: "completed", scheduledAt: "2026-02-02T21:00:00" },

  // Round 2 — completed
  { id: "m5", leagueId: "lg1", homeTeamId: "t1", awayTeamId: "t3", round: 2, homeScore: 52, awayScore: 47, status: "completed", scheduledAt: "2026-02-09T18:00:00" },
  { id: "m6", leagueId: "lg1", homeTeamId: "t2", awayTeamId: "t5", round: 2, homeScore: 40, awayScore: 45, status: "completed", scheduledAt: "2026-02-09T19:00:00" },
  { id: "m7", leagueId: "lg1", homeTeamId: "t4", awayTeamId: "t7", round: 2, homeScore: 49, awayScore: 55, status: "completed", scheduledAt: "2026-02-09T20:00:00" },
  { id: "m8", leagueId: "lg1", homeTeamId: "t6", awayTeamId: "t8", round: 2, homeScore: 58, awayScore: 50, status: "completed", scheduledAt: "2026-02-09T21:00:00" },

  // Round 3 — completed
  { id: "m9", leagueId: "lg1", homeTeamId: "t1", awayTeamId: "t4", round: 3, homeScore: 44, awayScore: 39, status: "completed", scheduledAt: "2026-02-16T18:00:00" },
  { id: "m10", leagueId: "lg1", homeTeamId: "t2", awayTeamId: "t6", round: 3, homeScore: 50, awayScore: 52, status: "completed", scheduledAt: "2026-02-16T19:00:00" },
  { id: "m11", leagueId: "lg1", homeTeamId: "t3", awayTeamId: "t8", round: 3, homeScore: 46, awayScore: 41, status: "completed", scheduledAt: "2026-02-16T20:00:00" },
  { id: "m12", leagueId: "lg1", homeTeamId: "t5", awayTeamId: "t7", round: 3, homeScore: 55, awayScore: 60, status: "completed", scheduledAt: "2026-02-16T21:00:00" },

  // Round 4 — completed
  { id: "m13", leagueId: "lg1", homeTeamId: "t1", awayTeamId: "t5", round: 4, homeScore: 47, awayScore: 43, status: "completed", scheduledAt: "2026-02-23T18:00:00" },
  { id: "m14", leagueId: "lg1", homeTeamId: "t2", awayTeamId: "t7", round: 4, homeScore: 38, awayScore: 41, status: "completed", scheduledAt: "2026-02-23T19:00:00" },
  { id: "m15", leagueId: "lg1", homeTeamId: "t3", awayTeamId: "t6", round: 4, homeScore: 53, awayScore: 48, status: "completed", scheduledAt: "2026-02-23T20:00:00" },
  { id: "m16", leagueId: "lg1", homeTeamId: "t4", awayTeamId: "t8", round: 4, homeScore: 42, awayScore: 46, status: "completed", scheduledAt: "2026-02-23T21:00:00" },

  // Round 5 — in progress (some completed, some scheduled)
  { id: "m17", leagueId: "lg1", homeTeamId: "t1", awayTeamId: "t6", round: 5, homeScore: 51, awayScore: 49, status: "completed", scheduledAt: "2026-03-02T18:00:00" },
  { id: "m18", leagueId: "lg1", homeTeamId: "t2", awayTeamId: "t8", round: 5, homeScore: 44, awayScore: 47, status: "completed", scheduledAt: "2026-03-02T19:00:00" },
  { id: "m19", leagueId: "lg1", homeTeamId: "t3", awayTeamId: "t5", round: 5, status: "scheduled", scheduledAt: "2026-03-19T20:00:00" },
  { id: "m20", leagueId: "lg1", homeTeamId: "t4", awayTeamId: "t7", round: 5, status: "scheduled", scheduledAt: "2026-03-19T21:00:00" },

  // Round 6 — scheduled
  { id: "m21", leagueId: "lg1", homeTeamId: "t1", awayTeamId: "t7", round: 6, status: "scheduled", scheduledAt: "2026-03-23T18:00:00" },
  { id: "m22", leagueId: "lg1", homeTeamId: "t2", awayTeamId: "t4", round: 6, status: "scheduled", scheduledAt: "2026-03-23T19:00:00" },
  { id: "m23", leagueId: "lg1", homeTeamId: "t3", awayTeamId: "t7", round: 6, status: "scheduled", scheduledAt: "2026-03-23T20:00:00" },
  { id: "m24", leagueId: "lg1", homeTeamId: "t5", awayTeamId: "t8", round: 6, status: "scheduled", scheduledAt: "2026-03-23T21:00:00" },

  // Round 7 — scheduled
  { id: "m25", leagueId: "lg1", homeTeamId: "t1", awayTeamId: "t8", round: 7, status: "scheduled", scheduledAt: "2026-03-30T18:00:00" },
  { id: "m26", leagueId: "lg1", homeTeamId: "t2", awayTeamId: "t3", round: 7, status: "scheduled", scheduledAt: "2026-03-30T19:00:00" },
  { id: "m27", leagueId: "lg1", homeTeamId: "t4", awayTeamId: "t6", round: 7, status: "scheduled", scheduledAt: "2026-03-30T20:00:00" },
  { id: "m28", leagueId: "lg1", homeTeamId: "t5", awayTeamId: "t6", round: 7, status: "scheduled", scheduledAt: "2026-03-30T21:00:00" },

  // Brooklyn Pickup Basketball (lg5) — 6 teams round robin
  // Round 1 — completed
  { id: "m29", leagueId: "lg5", homeTeamId: "t23", awayTeamId: "t24", round: 1, homeScore: 52, awayScore: 48, status: "completed", scheduledAt: "2026-02-08T10:00:00" },
  { id: "m30", leagueId: "lg5", homeTeamId: "t25", awayTeamId: "t26", round: 1, homeScore: 41, awayScore: 45, status: "completed", scheduledAt: "2026-02-08T11:00:00" },
  { id: "m31", leagueId: "lg5", homeTeamId: "t27", awayTeamId: "t28", round: 1, homeScore: 55, awayScore: 50, status: "completed", scheduledAt: "2026-02-08T12:00:00" },

  // Round 2 — completed
  { id: "m32", leagueId: "lg5", homeTeamId: "t23", awayTeamId: "t25", round: 2, homeScore: 60, awayScore: 54, status: "completed", scheduledAt: "2026-02-15T10:00:00" },
  { id: "m33", leagueId: "lg5", homeTeamId: "t24", awayTeamId: "t27", round: 2, homeScore: 47, awayScore: 43, status: "completed", scheduledAt: "2026-02-15T11:00:00" },
  { id: "m34", leagueId: "lg5", homeTeamId: "t26", awayTeamId: "t28", round: 2, homeScore: 38, awayScore: 42, status: "completed", scheduledAt: "2026-02-15T12:00:00" },

  // Round 3 — completed
  { id: "m35", leagueId: "lg5", homeTeamId: "t23", awayTeamId: "t26", round: 3, homeScore: 49, awayScore: 51, status: "completed", scheduledAt: "2026-02-22T10:00:00" },
  { id: "m36", leagueId: "lg5", homeTeamId: "t24", awayTeamId: "t28", round: 3, homeScore: 56, awayScore: 44, status: "completed", scheduledAt: "2026-02-22T11:00:00" },
  { id: "m37", leagueId: "lg5", homeTeamId: "t25", awayTeamId: "t27", round: 3, homeScore: 50, awayScore: 48, status: "completed", scheduledAt: "2026-02-22T12:00:00" },

  // Round 4 — scheduled
  { id: "m38", leagueId: "lg5", homeTeamId: "t23", awayTeamId: "t27", round: 4, status: "scheduled", scheduledAt: "2026-03-22T10:00:00" },
  { id: "m39", leagueId: "lg5", homeTeamId: "t24", awayTeamId: "t26", round: 4, status: "scheduled", scheduledAt: "2026-03-22T11:00:00" },
  { id: "m40", leagueId: "lg5", homeTeamId: "t25", awayTeamId: "t28", round: 4, status: "scheduled", scheduledAt: "2026-03-22T12:00:00" },

  // Round 5 — scheduled
  { id: "m41", leagueId: "lg5", homeTeamId: "t23", awayTeamId: "t28", round: 5, status: "scheduled", scheduledAt: "2026-03-29T10:00:00" },
  { id: "m42", leagueId: "lg5", homeTeamId: "t24", awayTeamId: "t25", round: 5, status: "scheduled", scheduledAt: "2026-03-29T11:00:00" },
  { id: "m43", leagueId: "lg5", homeTeamId: "t26", awayTeamId: "t27", round: 5, status: "scheduled", scheduledAt: "2026-03-29T12:00:00" },

  // Chelsea Piers Soccer (lg6) — 6 teams round robin
  // Round 1 — completed
  { id: "m44", leagueId: "lg6", homeTeamId: "t29", awayTeamId: "t30", round: 1, homeScore: 3, awayScore: 1, status: "completed", scheduledAt: "2026-02-07T14:00:00" },
  { id: "m45", leagueId: "lg6", homeTeamId: "t31", awayTeamId: "t32", round: 1, homeScore: 2, awayScore: 2, status: "completed", scheduledAt: "2026-02-07T15:00:00" },
  { id: "m46", leagueId: "lg6", homeTeamId: "t33", awayTeamId: "t34", round: 1, homeScore: 0, awayScore: 1, status: "completed", scheduledAt: "2026-02-07T16:00:00" },

  // Round 2 — completed
  { id: "m47", leagueId: "lg6", homeTeamId: "t29", awayTeamId: "t31", round: 2, homeScore: 1, awayScore: 2, status: "completed", scheduledAt: "2026-02-14T14:00:00" },
  { id: "m48", leagueId: "lg6", homeTeamId: "t30", awayTeamId: "t33", round: 2, homeScore: 2, awayScore: 0, status: "completed", scheduledAt: "2026-02-14T15:00:00" },
  { id: "m49", leagueId: "lg6", homeTeamId: "t32", awayTeamId: "t34", round: 2, homeScore: 3, awayScore: 3, status: "completed", scheduledAt: "2026-02-14T16:00:00" },

  // Round 3 — completed
  { id: "m50", leagueId: "lg6", homeTeamId: "t29", awayTeamId: "t32", round: 3, homeScore: 2, awayScore: 1, status: "completed", scheduledAt: "2026-02-21T14:00:00" },
  { id: "m51", leagueId: "lg6", homeTeamId: "t30", awayTeamId: "t34", round: 3, homeScore: 1, awayScore: 0, status: "completed", scheduledAt: "2026-02-21T15:00:00" },
  { id: "m52", leagueId: "lg6", homeTeamId: "t31", awayTeamId: "t33", round: 3, homeScore: 4, awayScore: 1, status: "completed", scheduledAt: "2026-02-21T16:00:00" },

  // Round 4 — scheduled
  { id: "m53", leagueId: "lg6", homeTeamId: "t29", awayTeamId: "t33", round: 4, status: "scheduled", scheduledAt: "2026-03-21T14:00:00" },
  { id: "m54", leagueId: "lg6", homeTeamId: "t30", awayTeamId: "t32", round: 4, status: "scheduled", scheduledAt: "2026-03-21T15:00:00" },
  { id: "m55", leagueId: "lg6", homeTeamId: "t31", awayTeamId: "t34", round: 4, status: "scheduled", scheduledAt: "2026-03-21T16:00:00" },

  // Round 5 — scheduled
  { id: "m56", leagueId: "lg6", homeTeamId: "t29", awayTeamId: "t34", round: 5, status: "scheduled", scheduledAt: "2026-03-28T14:00:00" },
  { id: "m57", leagueId: "lg6", homeTeamId: "t30", awayTeamId: "t31", round: 5, status: "scheduled", scheduledAt: "2026-03-28T15:00:00" },
  { id: "m58", leagueId: "lg6", homeTeamId: "t32", awayTeamId: "t33", round: 5, status: "scheduled", scheduledAt: "2026-03-28T16:00:00" },
];
