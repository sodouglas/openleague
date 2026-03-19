import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trophy } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="h-5 w-5" />
            <span className="text-base font-semibold">OpenLeague</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Sign in to manage your leagues
          </p>
        </div>

        <Card>
          <CardHeader className="p-4 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-8 text-sm"
              />
            </div>
            <Link href="/dashboard">
              <Button className="w-full h-8 text-sm mt-1">Sign in</Button>
            </Link>

            <Separator />

            <Link href="/dashboard">
              <Button variant="outline" className="w-full h-8 text-sm">
                Continue with Google
              </Button>
            </Link>
          </CardHeader>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span className="text-foreground font-medium cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
