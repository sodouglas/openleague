# OpenLeague

Open-source recreational sports league management platform. Create leagues, manage teams, schedule matches, and track standings.

yoyo was here

**Status**: Static prototype with seed data. No auth or database — UI only.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript, static export)
- **UI**: shadcn/ui + Tailwind CSS
- **Data**: Hardcoded TypeScript seed data
- **Deployment**: GitHub Pages

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static output goes to `out/`.

## Project Structure

```
src/
├── app/           # Pages (App Router)
├── components/    # UI and feature components
├── data/          # Seed data and lookup helpers
└── lib/           # Shared utilities
docs/
├── competitive-analysis.md
├── roles-privileges.md
└── implementation-plan.md
```

## Seed Data

The prototype ships with two organizations:

- **NYU Intramurals** — 3 leagues (basketball, soccer, volleyball), 35 users, full match schedule and standings
- **Acme Corp Rec League** — 1 league (softball), 5 users

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Login mockup (non-functional) |
| `/dashboard` | Dashboard home |
| `/dashboard/organizations` | Organization list |
| `/dashboard/organizations/[slug]` | Org overview |
| `/dashboard/organizations/[slug]/members` | Org members |
| `/dashboard/organizations/[slug]/leagues` | League list |
| `/dashboard/organizations/[slug]/leagues/[slug]` | League overview + standings |
| `.../leagues/[slug]/teams` | Teams list |
| `.../leagues/[slug]/teams/[id]` | Team roster |
| `.../leagues/[slug]/schedule` | Match schedule |
| `.../leagues/[slug]/standings` | Full standings |
| `/dashboard/join` | Join league (UI only) |
| `/dashboard/my-teams` | Player's teams |

## License

MIT
