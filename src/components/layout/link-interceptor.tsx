"use client";

import type { ReactNode, MouseEvent } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { parseRoute } from "@/lib/route-parser";

export function LinkInterceptor({
  children,
  onNavigate,
}: {
  children: ReactNode;
  onNavigate: (path: string) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleCapture(e: MouseEvent<HTMLDivElement>) {
    if (!isDesktop) return;

    let el = e.target as HTMLElement | null;
    while (el && el !== e.currentTarget) {
      if (el.tagName === "A") break;
      el = el.parentElement;
    }
    if (!el || el.tagName !== "A") return;

    const anchor = el as HTMLAnchorElement;
    const href = anchor.getAttribute("href");
    if (!href) return;

    // Only intercept internal dashboard links
    const fullPath = anchor.pathname;
    const dashboardIdx = fullPath.indexOf("/dashboard");
    if (dashboardIdx === -1) return;

    const canonicalPath = fullPath.slice(dashboardIdx);

    // Only intercept org/league/team drill-down links
    if (!canonicalPath.startsWith("/dashboard/organizations/")) return;

    // Let org-overview links navigate normally — org pages are full pages
    const parsed = parseRoute(canonicalPath);
    if (!parsed || parsed.type === "org-overview") return;

    e.preventDefault();
    e.stopPropagation();
    onNavigate(canonicalPath);
  }

  return (
    <div onClickCapture={handleCapture}>
      {children}
    </div>
  );
}
