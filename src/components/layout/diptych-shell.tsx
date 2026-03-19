"use client";

import type { ReactNode } from "react";
import { useDetailPane } from "@/components/layout/detail-pane-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LinkInterceptor } from "@/components/layout/link-interceptor";
import { DetailPane } from "@/components/layout/detail-pane";
import { cn } from "@/lib/utils";

export function DiptychShell({ children }: { children: ReactNode }) {
  const { isOpen, open, push } = useDetailPane();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const showPane = isOpen && isDesktop;

  return (
    <main
      className={cn(
        "flex-1 grid overflow-hidden transition-[grid-template-columns] duration-200",
        showPane ? "grid-cols-[1fr_1fr]" : "grid-cols-[1fr]"
      )}
    >
      <div className="min-h-0 overflow-y-auto p-3 pb-16 md:pb-3">
        <LinkInterceptor onNavigate={open}>{children}</LinkInterceptor>
      </div>
      {showPane && (
        <div className="min-h-0 overflow-y-auto">
          <LinkInterceptor onNavigate={push}>
            <DetailPane />
          </LinkInterceptor>
        </div>
      )}
    </main>
  );
}
