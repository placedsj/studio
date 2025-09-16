// src/app/(main)/layout.tsx
'use client';

import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex-col md:flex bg-background min-h-screen">
        <header className="border-b bg-card sticky top-0 z-40 shadow-sm">
          <div className="flex h-16 items-center px-4 container mx-auto">
             <h1 className="text-2xl font-headline font-extra-bold tracking-tight mr-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Harper's Home
            </h1>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
          {children}
        </main>
    </div>
  );
}
