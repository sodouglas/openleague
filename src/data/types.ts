export type Organization = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type OrgMember = {
  userId: string;
  orgId: string;
  role: "owner" | "admin" | "member";
};

export type LeagueStatus = "registration" | "in_progress" | "completed";
export type BracketType = "round_robin" | "single_elimination" | "double_elimination";
export type Sport = "basketball" | "soccer" | "volleyball" | "softball" | "flag_football";

export type League = {
  id: string;
  orgId: string;
  name: string;
  slug: string;
  sport: Sport;
  season: string;
  maxTeams: number;
  bracketType: BracketType;
  status: LeagueStatus;
  inviteCode: string;
  teams: number;
};

export type Team = {
  id: string;
  leagueId: string;
  name: string;
  captainId: string;
};

export type TeamMember = {
  userId: string;
  teamId: string;
  role: "captain" | "player";
  status: "active" | "invited" | "declined";
};

export type MatchStatus = "scheduled" | "in_progress" | "completed";

export type Match = {
  id: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  round: number;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  scheduledAt: string;
};

export type Standing = {
  teamId: string;
  leagueId: string;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
  rank: number;
};
