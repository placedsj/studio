import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/sidebar-nav";
import { Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <Button variant="ghost" className="flex items-center gap-3 p-2 h-auto" asChild>
            <Link href="/dashboard">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 shrink-0">
                 <Users className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-headline font-bold group-data-[collapsible=icon]:hidden">FamilyVerse</h1>
            </Link>
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
           {/* User profile can be added here */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
