"use client";

import { useDetailPane } from "@/components/layout/detail-pane-context";
import { DetailPaneContent } from "@/components/layout/detail-pane-content";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X } from "lucide-react";
import { parseRoute } from "@/lib/route-parser";
import {
  getOrgBySlug,
  getLeagueBySlug,
  getTeamById,
} from "@/data";

function getPaneTitle(path: string): string {
  const route = parseRoute(path);
  if (!route) return "Detail";

  switch (route.type) {
    case "org-overview": {
      const org = getOrgBySlug(route.orgSlug);
      return org?.name ?? "Organization";
    }
    case "org-members": {
      const org = getOrgBySlug(route.orgSlug);
      return `${org?.name ?? "Org"} — Members`;
    }
    case "org-leagues": {
      const org = getOrgBySlug(route.orgSlug);
      return `${org?.name ?? "Org"} — Leagues`;
    }
    case "league-overview": {
      const org = getOrgBySlug(route.orgSlug);
      const league = org ? getLeagueBySlug(route.leagueSlug, org.id) : null;
      return league?.name ?? "League";
    }
    case "team-detail": {
      const team = getTeamById(route.teamId);
      return team?.name ?? "Team";
    }
  }
}

export function DetailPane() {
  const { path, canGoBack, back, close } = useDetailPane();
  if (!path) return null;

  const title = getPaneTitle(path);

  return (
    <div className="flex flex-col h-full border-l">
      <div className="flex items-center gap-1 px-3 py-2 border-b shrink-0">
        {canGoBack && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={back}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <h2 className="text-sm font-medium truncate flex-1">{title}</h2>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={close}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <DetailPaneContent path={path} />
      </div>
    </div>
  );
}
