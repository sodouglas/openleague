import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { DetailPaneProvider } from "@/components/layout/detail-pane-context";
import { DiptychShell } from "@/components/layout/diptych-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DetailPaneProvider>
      <div className="flex h-full min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />
          <DiptychShell>{children}</DiptychShell>
        </div>
        <MobileNav />
      </div>
    </DetailPaneProvider>
  );
}
