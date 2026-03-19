import { Team, TeamMember } from "./types";

export const teams: Team[] = [
  // Basketball teams (lg1)
  { id: "t1", leagueId: "lg1", name: "Violet Vipers", captainId: "u4" },
  { id: "t2", leagueId: "lg1", name: "Court Crushers", captainId: "u5" },
  { id: "t3", leagueId: "lg1", name: "Downtown Dunkers", captainId: "u6" },
  { id: "t4", leagueId: "lg1", name: "Bobst Ballers", captainId: "u7" },
  { id: "t5", leagueId: "lg1", name: "Washington Sq Warriors", captainId: "u8" },
  { id: "t6", leagueId: "lg1", name: "Stern Shooters", captainId: "u9" },
  { id: "t7", leagueId: "lg1", name: "Tisch Titans", captainId: "u10" },
  { id: "t8", leagueId: "lg1", name: "Tandon Thunder", captainId: "u11" },

  // Soccer teams (lg2) — registration phase
  { id: "t9", leagueId: "lg2", name: "Purple Haze FC", captainId: "u4" },
  { id: "t10", leagueId: "lg2", name: "Greenwich Rovers", captainId: "u6" },
  { id: "t11", leagueId: "lg2", name: "Bleecker Street FC", captainId: "u8" },
  { id: "t12", leagueId: "lg2", name: "Mercer United", captainId: "u10" },
  { id: "t13", leagueId: "lg2", name: "Silver Strikers", captainId: "u5" },
  { id: "t14", leagueId: "lg2", name: "Waverly FC", captainId: "u9" },

  // Volleyball teams (lg3) — completed
  { id: "t15", leagueId: "lg3", name: "Net Ninjas", captainId: "u4" },
  { id: "t16", leagueId: "lg3", name: "Spike Squad", captainId: "u5" },
  { id: "t17", leagueId: "lg3", name: "Block Party", captainId: "u7" },
  { id: "t18", leagueId: "lg3", name: "Set & Forget", captainId: "u9" },
  { id: "t19", leagueId: "lg3", name: "Ace Ventura", captainId: "u11" },
  { id: "t20", leagueId: "lg3", name: "Dig Deep", captainId: "u6" },

  // Acme softball teams (lg4)
  { id: "t21", leagueId: "lg4", name: "Sales Sluggers", captainId: "u38" },
  { id: "t22", leagueId: "lg4", name: "Engineering Eagles", captainId: "u39" },

  // Brooklyn Pickup Basketball (lg5)
  { id: "t23", leagueId: "lg5", name: "Bed-Stuy Buckets", captainId: "u1" },
  { id: "t24", leagueId: "lg5", name: "Flatbush Flyers", captainId: "u43" },
  { id: "t25", leagueId: "lg5", name: "Park Slope Prowlers", captainId: "u45" },
  { id: "t26", leagueId: "lg5", name: "Williamsburg Wolves", captainId: "u47" },
  { id: "t27", leagueId: "lg5", name: "DUMBO Dribblers", captainId: "u41" },
  { id: "t28", leagueId: "lg5", name: "Bushwick Blazers", captainId: "u44" },

  // Chelsea Piers Soccer (lg6)
  { id: "t29", leagueId: "lg6", name: "West Side Wanderers", captainId: "u49" },
  { id: "t30", leagueId: "lg6", name: "Pier Pressure FC", captainId: "u51" },
  { id: "t31", leagueId: "lg6", name: "Hudson Strikers", captainId: "u1" },
  { id: "t32", leagueId: "lg6", name: "Chelsea Blues", captainId: "u53" },
  { id: "t33", leagueId: "lg6", name: "Meatpacking United", captainId: "u50" },
  { id: "t34", leagueId: "lg6", name: "High Line FC", captainId: "u54" },

  // Prospect Park FC Soccer (lg7) — registration
  { id: "t35", leagueId: "lg7", name: "Lakeside Lions", captainId: "u64" },
  { id: "t36", leagueId: "lg7", name: "Meadow Runners", captainId: "u66" },
  { id: "t37", leagueId: "lg7", name: "Long Meadow FC", captainId: "u68" },
  { id: "t38", leagueId: "lg7", name: "Grand Army United", captainId: "u1" },

  // Greenpoint Social Softball (lg8) — registration
  { id: "t39", leagueId: "lg8", name: "McCarren Mashers", captainId: "u55" },
  { id: "t40", leagueId: "lg8", name: "Transmitter Park Sluggers", captainId: "u57" },
  { id: "t41", leagueId: "lg8", name: "Java Street Jawbreakers", captainId: "u56" },
];

export const teamMembers: TeamMember[] = [
  // Violet Vipers (t1)
  { userId: "u4", teamId: "t1", role: "captain", status: "active" },
  { userId: "u12", teamId: "t1", role: "player", status: "active" },
  { userId: "u13", teamId: "t1", role: "player", status: "active" },
  { userId: "u14", teamId: "t1", role: "player", status: "active" },
  { userId: "u15", teamId: "t1", role: "player", status: "active" },
  { userId: "u16", teamId: "t1", role: "player", status: "active" },

  // Court Crushers (t2)
  { userId: "u5", teamId: "t2", role: "captain", status: "active" },
  { userId: "u17", teamId: "t2", role: "player", status: "active" },
  { userId: "u18", teamId: "t2", role: "player", status: "active" },
  { userId: "u19", teamId: "t2", role: "player", status: "active" },
  { userId: "u20", teamId: "t2", role: "player", status: "active" },
  { userId: "u21", teamId: "t2", role: "player", status: "active" },
  { userId: "u22", teamId: "t2", role: "player", status: "active" },

  // Downtown Dunkers (t3)
  { userId: "u6", teamId: "t3", role: "captain", status: "active" },
  { userId: "u23", teamId: "t3", role: "player", status: "active" },
  { userId: "u24", teamId: "t3", role: "player", status: "active" },
  { userId: "u25", teamId: "t3", role: "player", status: "active" },
  { userId: "u26", teamId: "t3", role: "player", status: "active" },

  // Bobst Ballers (t4)
  { userId: "u7", teamId: "t4", role: "captain", status: "active" },
  { userId: "u27", teamId: "t4", role: "player", status: "active" },
  { userId: "u28", teamId: "t4", role: "player", status: "active" },
  { userId: "u29", teamId: "t4", role: "player", status: "active" },
  { userId: "u30", teamId: "t4", role: "player", status: "active" },
  { userId: "u31", teamId: "t4", role: "player", status: "active" },

  // Washington Sq Warriors (t5)
  { userId: "u8", teamId: "t5", role: "captain", status: "active" },
  { userId: "u32", teamId: "t5", role: "player", status: "active" },
  { userId: "u33", teamId: "t5", role: "player", status: "active" },
  { userId: "u34", teamId: "t5", role: "player", status: "active" },
  { userId: "u35", teamId: "t5", role: "player", status: "active" },
  { userId: "u12", teamId: "t5", role: "player", status: "active" },

  // Stern Shooters (t6)
  { userId: "u9", teamId: "t6", role: "captain", status: "active" },
  { userId: "u13", teamId: "t6", role: "player", status: "active" },
  { userId: "u14", teamId: "t6", role: "player", status: "active" },
  { userId: "u17", teamId: "t6", role: "player", status: "active" },
  { userId: "u18", teamId: "t6", role: "player", status: "active" },
  { userId: "u23", teamId: "t6", role: "player", status: "active" },

  // Tisch Titans (t7)
  { userId: "u10", teamId: "t7", role: "captain", status: "active" },
  { userId: "u15", teamId: "t7", role: "player", status: "active" },
  { userId: "u16", teamId: "t7", role: "player", status: "active" },
  { userId: "u19", teamId: "t7", role: "player", status: "active" },
  { userId: "u24", teamId: "t7", role: "player", status: "active" },
  { userId: "u25", teamId: "t7", role: "player", status: "active" },
  { userId: "u26", teamId: "t7", role: "player", status: "active" },

  // Tandon Thunder (t8)
  { userId: "u11", teamId: "t8", role: "captain", status: "active" },
  { userId: "u20", teamId: "t8", role: "player", status: "active" },
  { userId: "u21", teamId: "t8", role: "player", status: "active" },
  { userId: "u27", teamId: "t8", role: "player", status: "active" },
  { userId: "u28", teamId: "t8", role: "player", status: "active" },
  { userId: "u29", teamId: "t8", role: "player", status: "active" },

  // Purple Haze FC (t9) — NYU Soccer single elimination
  { userId: "u1", teamId: "t9", role: "player", status: "active" },

  // Bed-Stuy Buckets (t23) — Brooklyn Pickup Basketball
  { userId: "u1", teamId: "t23", role: "captain", status: "active" },
  { userId: "u42", teamId: "t23", role: "player", status: "active" },
  { userId: "u46", teamId: "t23", role: "player", status: "active" },
  { userId: "u48", teamId: "t23", role: "player", status: "active" },

  // Flatbush Flyers (t24)
  { userId: "u43", teamId: "t24", role: "captain", status: "active" },
  { userId: "u44", teamId: "t24", role: "player", status: "active" },
  { userId: "u45", teamId: "t24", role: "player", status: "active" },
  { userId: "u41", teamId: "t24", role: "player", status: "active" },

  // Park Slope Prowlers (t25)
  { userId: "u45", teamId: "t25", role: "captain", status: "active" },
  { userId: "u46", teamId: "t25", role: "player", status: "active" },
  { userId: "u47", teamId: "t25", role: "player", status: "active" },
  { userId: "u48", teamId: "t25", role: "player", status: "active" },

  // Williamsburg Wolves (t26)
  { userId: "u47", teamId: "t26", role: "captain", status: "active" },
  { userId: "u42", teamId: "t26", role: "player", status: "active" },
  { userId: "u43", teamId: "t26", role: "player", status: "active" },

  // DUMBO Dribblers (t27)
  { userId: "u41", teamId: "t27", role: "captain", status: "active" },
  { userId: "u44", teamId: "t27", role: "player", status: "active" },
  { userId: "u48", teamId: "t27", role: "player", status: "active" },

  // Bushwick Blazers (t28)
  { userId: "u44", teamId: "t28", role: "captain", status: "active" },
  { userId: "u41", teamId: "t28", role: "player", status: "active" },
  { userId: "u42", teamId: "t28", role: "player", status: "active" },

  // Hudson Strikers (t31) — Chelsea Piers Soccer
  { userId: "u1", teamId: "t31", role: "captain", status: "active" },
  { userId: "u50", teamId: "t31", role: "player", status: "active" },
  { userId: "u52", teamId: "t31", role: "player", status: "active" },
  { userId: "u54", teamId: "t31", role: "player", status: "active" },

  // West Side Wanderers (t29)
  { userId: "u49", teamId: "t29", role: "captain", status: "active" },
  { userId: "u51", teamId: "t29", role: "player", status: "active" },
  { userId: "u53", teamId: "t29", role: "player", status: "active" },

  // Pier Pressure FC (t30)
  { userId: "u51", teamId: "t30", role: "captain", status: "active" },
  { userId: "u49", teamId: "t30", role: "player", status: "active" },
  { userId: "u52", teamId: "t30", role: "player", status: "active" },

  // Chelsea Blues (t32)
  { userId: "u53", teamId: "t32", role: "captain", status: "active" },
  { userId: "u50", teamId: "t32", role: "player", status: "active" },
  { userId: "u54", teamId: "t32", role: "player", status: "active" },

  // Meatpacking United (t33)
  { userId: "u50", teamId: "t33", role: "captain", status: "active" },
  { userId: "u49", teamId: "t33", role: "player", status: "active" },
  { userId: "u53", teamId: "t33", role: "player", status: "active" },

  // High Line FC (t34)
  { userId: "u54", teamId: "t34", role: "captain", status: "active" },
  { userId: "u51", teamId: "t34", role: "player", status: "active" },
  { userId: "u52", teamId: "t34", role: "player", status: "active" },

  // Grand Army United (t38) — Prospect Park FC, registration
  { userId: "u1", teamId: "t38", role: "captain", status: "active" },
  { userId: "u65", teamId: "t38", role: "player", status: "active" },
  { userId: "u69", teamId: "t38", role: "player", status: "active" },
  { userId: "u70", teamId: "t38", role: "player", status: "active" },

  // Lakeside Lions (t35)
  { userId: "u64", teamId: "t35", role: "captain", status: "active" },
  { userId: "u66", teamId: "t35", role: "player", status: "active" },
  { userId: "u67", teamId: "t35", role: "player", status: "active" },

  // Meadow Runners (t36)
  { userId: "u66", teamId: "t36", role: "captain", status: "active" },
  { userId: "u65", teamId: "t36", role: "player", status: "active" },
  { userId: "u70", teamId: "t36", role: "player", status: "active" },

  // Long Meadow FC (t37)
  { userId: "u68", teamId: "t37", role: "captain", status: "active" },
  { userId: "u69", teamId: "t37", role: "player", status: "active" },
  { userId: "u67", teamId: "t37", role: "player", status: "active" },
];
