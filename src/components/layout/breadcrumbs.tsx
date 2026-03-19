import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-3 min-w-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 min-w-0">
          {i > 0 && <ChevronRight className="h-3 w-3 shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground truncate max-w-[120px] md:max-w-none"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground truncate max-w-[120px] md:max-w-none">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
