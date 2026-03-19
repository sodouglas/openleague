import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function JoinLeaguePage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Join a League</h1>
        <p className="text-sm text-muted-foreground">
          Enter an invite code from your league organizer
        </p>
      </div>

      <Card className="max-w-sm">
        <CardHeader className="p-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="code" className="text-xs">
              Invite Code
            </Label>
            <Input
              id="code"
              placeholder="e.g. NYU-BB-S26"
              className="h-8 text-sm font-mono"
            />
          </div>
          <Button className="h-8 text-sm w-full">Join League</Button>
          <p className="text-xs text-muted-foreground">
            Ask your league administrator for the invite code. Once you join, you
            can create or join a team.
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}
