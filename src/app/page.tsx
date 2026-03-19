import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "League Management",
    description: "Create and manage leagues for any sport with flexible bracket types.",
  },
  {
    icon: Users,
    title: "Team Registration",
    description: "Captains create teams, invite players, and manage rosters.",
  },
  {
    icon: Calendar,
    title: "Scheduling",
    description: "Generate round-robin or elimination schedules automatically.",
  },
  {
    icon: BarChart3,
    title: "Live Standings",
    description: "Track wins, losses, and points with auto-computed rankings.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b border-border px-4 h-10">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4" />
          <span className="text-sm font-semibold">OpenLeague</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Log in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="h-7 text-xs">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="px-4 py-16 md:py-24 text-center max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Recreational sports league management, simplified.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
            OpenLeague is a free, open-source platform for organizing intramural and
            recreational sports leagues. Create leagues, manage teams, schedule
            matches, and track standings — all in one place.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Link href="/dashboard">
              <Button size="sm" className="h-8 px-4 text-sm">
                Get Started
              </Button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="h-8 px-4 text-sm">
                View on GitHub
              </Button>
            </a>
          </div>
        </section>

        <section className="border-t border-border px-4 py-12">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-[4px] bg-neutral-100 flex items-center justify-center">
                  <feature.icon className="h-4 w-4 text-neutral-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border px-4 py-12 bg-muted/50">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-lg font-semibold">Why OpenLeague?</h2>
            <ul className="mt-3 text-sm text-muted-foreground space-y-2 text-left">
              <li>
                <strong className="text-foreground">Free and open-source</strong> — no
                hidden fees, no per-team pricing
              </li>
              <li>
                <strong className="text-foreground">Self-hostable</strong> — run it on
                your own infrastructure or use our hosted version
              </li>
              <li>
                <strong className="text-foreground">Modern and minimal</strong> — clean
                interface designed for quick workflows
              </li>
              <li>
                <strong className="text-foreground">Built for rec leagues</strong> — not
                over-engineered for travel tournaments or elite athletics
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        OpenLeague — Open-source recreational sports league management
      </footer>
    </div>
  );
}
