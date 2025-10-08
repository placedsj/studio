// src/components/main-nav.tsx
'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"
import { ComponentProps } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/log', label: 'Daily Care' },
    { href: '/calendar', label: 'Calendar' },
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
    { href: '/journal', label: 'Journal' },
    { href: '/fund', label: 'Fund' },
    { href: '/health', label: 'Health Hub' },
    { href: '/milestones', label: 'Milestones' },
    { href: '/shared-lists', label: 'Shared Lists' },
    { href: '/family-tree', label: 'Family Tree' },
]

const NavDropdown = ({ label, items }: { label: string, items: {href: string, label: string}[] }) => {
    const pathname = usePathname();
    const isActive = items.some(item => pathname.startsWith(item.href));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                    "text-sm font-medium transition-colors hover:text-primary p-0 h-auto",
                    isActive ? "text-primary" : "text-muted-foreground"
                )}>
                    {label}
                    <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" forceMount>
                <DropdownMenuGroup>
                     {items.map((item) => (
                        <Link href={item.href} key={item.href} passHref>
                            <DropdownMenuItem>
                                {item.label}
                            </DropdownMenuItem>
                        </Link>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
      </DropdownMenu>
    );
};

export function MainNav({
  className,
  ...props
}: ComponentProps<"nav">) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)}
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
      <NavDropdown label="Child-Focused" items={childFocusedItems} />
      <NavDropdown label="Legal & Evidence" items={legalEvidenceItems} />
      <NavDropdown label="AI Tools" items={aiToolsItems} />
    </nav>
  )
}
