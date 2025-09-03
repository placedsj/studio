// src/app/(main)/layout.tsx
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/sidebar-nav";
import { Users, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { CoParentingTip } from "@/components/co-parenting-tip";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logOut } = useAuth();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <Button variant="ghost" className="flex items-center gap-3 p-2 h-auto" asChild>
            <Link href="/dashboard">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 shrink-0">
                 <Users className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-headline font-bold group-data-[collapsible=icon]:hidden">Harper's Home</h1>
            </Link>
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-3 p-2 h-auto justify-start w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center">
                        {loading ? (
                            <Skeleton className="h-8 w-8 rounded-full" />
                        ) : (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.photoURL ?? undefined} />
                                <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className="group-data-[collapsible=icon]:hidden text-left">
                            <p className="font-medium text-sm">{user?.displayName}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                        </p>
                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
          {children}
          <div className="mt-12">
            <CoParentingTip />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
