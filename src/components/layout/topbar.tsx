import { currentUser } from "@/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Topbar() {
  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="flex h-10 items-center justify-between border-b border-border px-3 bg-background">
      <div className="md:hidden text-sm font-semibold">OpenLeague</div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{currentUser.name}</span>
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-xs bg-neutral-200">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
