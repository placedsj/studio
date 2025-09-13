// src/components/main-nav.tsx
'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"
import { ComponentProps } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/log', label: 'Daily Care' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/journal', label: 'Journal' },
    { href: '/fund', label: 'Fund' },
    { href: '/communication', label: 'Chat' },
];

const legalEvidenceItems = [
    { href: '/evidence-log', label: 'Evidence Log' },
    { href: '/evidence-ai', label: 'Evidence AI Assistant' },
    { href: '/document-analyzer', label: 'Document Analyzer' },
];

const aiToolsItems = [
    { href: '/ai-tools/schedule-optimizer', label: 'Schedule Optimizer' },
    { href: '/ai-tools/communication-coach', label: 'Communication Coach' },
];

const childFocusedItems = [
    { href: '/health', label: 'Health Hub' },
    { href: '/milestones', label: 'Milestones' },
    { href: '/shared-lists', label: 'Shared Lists' },
    { href: '/family-tree', label: 'Family Tree' },
]

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary p-0 h-auto">More</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start" forceMount>
            <DropdownMenuLabel>Child-Focused</DropdownMenuLabel>
            <DropdownMenuGroup>
                 {childFocusedItems.map((item) => (
                    <Link href={item.href} key={item.href} passHref>
                        <DropdownMenuItem>
                            {item.label}
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Legal & Evidence</DropdownMenuLabel>
            <DropdownMenuGroup>
                 {legalEvidenceItems.map((item) => (
                    <Link href={item.href} key={item.href} passHref>
                        <DropdownMenuItem>
                            {item.label}
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>AI Tools</DropdownMenuLabel>
             <DropdownMenuGroup>
                 {aiToolsItems.map((item) => (
                    <Link href={item.href} key={item.href} passHref>
                        <DropdownMenuItem>
                            {item.label}
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
