import { Standing } from "./types";

// Basketball league (lg1) standings — based on completed matches through round 5
export const standings: Standing[] = [
  { teamId: "t1", leagueId: "lg1", wins: 5, losses: 0, ties: 0, pointsFor: 242, pointsAgainst: 220, rank: 1 },
  { teamId: "t7", leagueId: "lg1", wins: 4, losses: 1, ties: 0, pointsFor: 217, pointsAgainst: 197, rank: 2 },
  { teamId: "t6", leagueId: "lg1", wins: 3, losses: 2, ties: 0, pointsFor: 251, pointsAgainst: 240, rank: 3 },
  { teamId: "t3", leagueId: "lg1", wins: 3, losses: 1, ties: 0, pointsFor: 201, pointsAgainst: 187, rank: 4 },
  { teamId: "t5", leagueId: "lg1", wins: 2, losses: 2, ties: 0, pointsFor: 181, pointsAgainst: 192, rank: 5 },
  { teamId: "t8", leagueId: "lg1", wins: 2, losses: 3, ties: 0, pointsFor: 237, pointsAgainst: 249, rank: 6 },
  { teamId: "t2", leagueId: "lg1", wins: 1, losses: 4, ties: 0, pointsFor: 214, pointsAgainst: 225, rank: 7 },
  { teamId: "t4", leagueId: "lg1", wins: 0, losses: 4, ties: 0, pointsFor: 181, pointsAgainst: 210, rank: 8 },

  // Volleyball league (lg3) — completed final standings
  { teamId: "t15", leagueId: "lg3", wins: 4, losses: 1, ties: 0, pointsFor: 312, pointsAgainst: 278, rank: 1 },
  { teamId: "t16", leagueId: "lg3", wins: 4, losses: 1, ties: 0, pointsFor: 305, pointsAgainst: 280, rank: 2 },
  { teamId: "t17", leagueId: "lg3", wins: 3, losses: 2, ties: 0, pointsFor: 290, pointsAgainst: 285, rank: 3 },
  { teamId: "t20", leagueId: "lg3", wins: 2, losses: 3, ties: 0, pointsFor: 275, pointsAgainst: 290, rank: 4 },
  { teamId: "t18", leagueId: "lg3", wins: 1, losses: 4, ties: 0, pointsFor: 260, pointsAgainst: 300, rank: 5 },
  { teamId: "t19", leagueId: "lg3", wins: 1, losses: 4, ties: 0, pointsFor: 258, pointsAgainst: 310, rank: 6 },

  // Brooklyn Pickup Basketball (lg5) — through round 3
  { teamId: "t23", leagueId: "lg5", wins: 2, losses: 1, ties: 0, pointsFor: 161, pointsAgainst: 153, rank: 1 },
  { teamId: "t24", leagueId: "lg5", wins: 2, losses: 1, ties: 0, pointsFor: 151, pointsAgainst: 135, rank: 2 },
  { teamId: "t26", leagueId: "lg5", wins: 2, losses: 1, ties: 0, pointsFor: 134, pointsAgainst: 129, rank: 3 },
  { teamId: "t25", leagueId: "lg5", wins: 1, losses: 2, ties: 0, pointsFor: 145, pointsAgainst: 153, rank: 4 },
  { teamId: "t27", leagueId: "lg5", wins: 1, losses: 2, ties: 0, pointsFor: 146, pointsAgainst: 148, rank: 5 },
  { teamId: "t28", leagueId: "lg5", wins: 1, losses: 2, ties: 0, pointsFor: 136, pointsAgainst: 153, rank: 6 },

  // Chelsea Piers Soccer (lg6) — through round 3
  { teamId: "t31", leagueId: "lg6", wins: 2, losses: 0, ties: 1, pointsFor: 8, pointsAgainst: 4, rank: 1 },
  { teamId: "t29", leagueId: "lg6", wins: 2, losses: 1, ties: 0, pointsFor: 6, pointsAgainst: 3, rank: 2 },
  { teamId: "t30", leagueId: "lg6", wins: 2, losses: 1, ties: 0, pointsFor: 4, pointsAgainst: 3, rank: 3 },
  { teamId: "t34", leagueId: "lg6", wins: 1, losses: 1, ties: 1, pointsFor: 4, pointsAgainst: 4, rank: 4 },
  { teamId: "t32", leagueId: "lg6", wins: 0, losses: 1, ties: 2, pointsFor: 6, pointsAgainst: 7, rank: 5 },
  { teamId: "t33", leagueId: "lg6", wins: 0, losses: 3, ties: 0, pointsFor: 1, pointsAgainst: 8, rank: 6 },
];
