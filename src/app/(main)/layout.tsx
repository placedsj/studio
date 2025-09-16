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
    <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-2xl font-headline font-extra-bold tracking-tight mr-6">Harper's Home</h1>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </div>
    </div>
  );
}
