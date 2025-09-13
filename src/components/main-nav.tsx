// src/components/main-nav.tsx
'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { ComponentProps } from "react";

const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/log', label: 'Daily Care' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/journal', label: 'Journal' },
    { href: '/fund', label: 'Fund' },
    { href: '/communication', label: 'Chat' },
];

export function MainNav({
  className,
  ...props
}: ComponentProps<"nav">) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
