import { Organization, OrgMember } from "./types";

export const organizations: Organization[] = [
  {
    id: "org1",
    name: "NYU Intramurals",
    slug: "nyu-intramurals",
    description:
      "New York University's intramural sports program. Open to all current students, faculty, and staff.",
  },
  {
    id: "org2",
    name: "Acme Corp Rec League",
    slug: "acme-corp-rec",
    description:
      "Recreational sports leagues for Acme Corporation employees. Building team spirit one game at a time.",
  },
  {
    id: "org3",
    name: "Brooklyn Pickup Sports",
    slug: "brooklyn-pickup",
    description:
      "Community-organized pickup games across Brooklyn. Basketball, soccer, and volleyball at local parks.",
  },
  {
    id: "org4",
    name: "Chelsea Piers Adult League",
    slug: "chelsea-piers-adult",
    description:
      "Adult recreational leagues at Chelsea Piers. Competitive and casual divisions available.",
  },
  {
    id: "org5",
    name: "Greenpoint Social Club",
    slug: "greenpoint-social",
    description:
      "Neighborhood sports and social club. Softball in summer, volleyball in winter, good times year-round.",
  },
  {
    id: "org6",
    name: "TechStartups NYC League",
    slug: "techstartups-nyc",
    description:
      "Inter-company sports leagues for NYC tech startups. Network while you compete.",
  },
  {
    id: "org7",
    name: "Prospect Park FC",
    slug: "prospect-park-fc",
    description:
      "Soccer-focused club based in Prospect Park. Youth and adult divisions, all skill levels welcome.",
  },
];

export const orgMembers: OrgMember[] = [
  // NYU Intramurals
  { userId: "u1", orgId: "org1", role: "owner" },
  { userId: "u2", orgId: "org1", role: "admin" },
  { userId: "u3", orgId: "org1", role: "admin" },
  { userId: "u4", orgId: "org1", role: "member" },
  { userId: "u5", orgId: "org1", role: "member" },
  { userId: "u6", orgId: "org1", role: "member" },
  { userId: "u7", orgId: "org1", role: "member" },
  { userId: "u8", orgId: "org1", role: "member" },
  { userId: "u9", orgId: "org1", role: "member" },
  { userId: "u10", orgId: "org1", role: "member" },
  { userId: "u11", orgId: "org1", role: "member" },
  { userId: "u12", orgId: "org1", role: "member" },
  { userId: "u13", orgId: "org1", role: "member" },
  { userId: "u14", orgId: "org1", role: "member" },
  { userId: "u15", orgId: "org1", role: "member" },
  { userId: "u16", orgId: "org1", role: "member" },
  { userId: "u17", orgId: "org1", role: "member" },
  { userId: "u18", orgId: "org1", role: "member" },
  { userId: "u19", orgId: "org1", role: "member" },
  { userId: "u20", orgId: "org1", role: "member" },
  { userId: "u21", orgId: "org1", role: "member" },
  { userId: "u22", orgId: "org1", role: "member" },
  { userId: "u23", orgId: "org1", role: "member" },
  { userId: "u24", orgId: "org1", role: "member" },
  { userId: "u25", orgId: "org1", role: "member" },
  { userId: "u26", orgId: "org1", role: "member" },
  { userId: "u27", orgId: "org1", role: "member" },
  { userId: "u28", orgId: "org1", role: "member" },
  { userId: "u29", orgId: "org1", role: "member" },
  { userId: "u30", orgId: "org1", role: "member" },
  { userId: "u31", orgId: "org1", role: "member" },
  { userId: "u32", orgId: "org1", role: "member" },
  { userId: "u33", orgId: "org1", role: "member" },
  { userId: "u34", orgId: "org1", role: "member" },
  { userId: "u35", orgId: "org1", role: "member" },

  // Acme Corp
  { userId: "u36", orgId: "org2", role: "owner" },
  { userId: "u37", orgId: "org2", role: "admin" },
  { userId: "u38", orgId: "org2", role: "member" },
  { userId: "u39", orgId: "org2", role: "member" },
  { userId: "u40", orgId: "org2", role: "member" },

  // Brooklyn Pickup Sports
  { userId: "u41", orgId: "org3", role: "owner" },
  { userId: "u42", orgId: "org3", role: "admin" },
  { userId: "u1", orgId: "org3", role: "member" },
  { userId: "u43", orgId: "org3", role: "member" },
  { userId: "u44", orgId: "org3", role: "member" },
  { userId: "u45", orgId: "org3", role: "member" },
  { userId: "u46", orgId: "org3", role: "member" },
  { userId: "u47", orgId: "org3", role: "member" },
  { userId: "u48", orgId: "org3", role: "member" },

  // Chelsea Piers Adult League
  { userId: "u49", orgId: "org4", role: "owner" },
  { userId: "u50", orgId: "org4", role: "admin" },
  { userId: "u1", orgId: "org4", role: "member" },
  { userId: "u51", orgId: "org4", role: "member" },
  { userId: "u52", orgId: "org4", role: "member" },
  { userId: "u53", orgId: "org4", role: "member" },
  { userId: "u54", orgId: "org4", role: "member" },

  // Greenpoint Social Club
  { userId: "u55", orgId: "org5", role: "owner" },
  { userId: "u56", orgId: "org5", role: "admin" },
  { userId: "u1", orgId: "org5", role: "admin" },
  { userId: "u57", orgId: "org5", role: "member" },
  { userId: "u58", orgId: "org5", role: "member" },

  // TechStartups NYC League
  { userId: "u59", orgId: "org6", role: "owner" },
  { userId: "u60", orgId: "org6", role: "admin" },
  { userId: "u61", orgId: "org6", role: "member" },
  { userId: "u62", orgId: "org6", role: "member" },
  { userId: "u63", orgId: "org6", role: "member" },

  // Prospect Park FC
  { userId: "u64", orgId: "org7", role: "owner" },
  { userId: "u65", orgId: "org7", role: "admin" },
  { userId: "u1", orgId: "org7", role: "member" },
  { userId: "u66", orgId: "org7", role: "member" },
  { userId: "u67", orgId: "org7", role: "member" },
  { userId: "u68", orgId: "org7", role: "member" },
  { userId: "u69", orgId: "org7", role: "member" },
  { userId: "u70", orgId: "org7", role: "member" },
];
