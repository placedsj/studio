
// src/components/sidebar-nav.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Home, Calendar, BookHeart, Landmark, TrendingUp, Baby, Heart, AlertTriangle, Users, MessagesSquare, ScanLine, FileSearch, Wand2, HeartPulse, Gavel, FileClock
} from 'lucide-react';
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/communication', label: 'Communication Hub', icon: MessagesSquare },
  { type: 'separator', label: 'Child' },
  { href: '/log', label: "Harper's Log", icon: Baby },
  { href: '/milestones', label: 'Milestones', icon: TrendingUp },
  { href: '/health', label: 'Health Hub', icon: HeartPulse },
  { href: '/journal', label: 'Journal', icon: BookHeart },
  { type: 'separator', label: 'Family' },
  { href: '/profile', label: "Harper's Profile", icon: Heart },
  { href: '/family-tree', label: 'Family Tree', icon: Users },
  { href: '/emergency', label: 'Emergency Info', icon: AlertTriangle },
  { type: 'separator', label: 'Finance & Legal' },
  { href: '/fund', label: 'Shared Fund', icon: Landmark },
  { href: '/shared-lists', label: 'Shared Lists', icon: ScanLine },
  { href: '/evidence-log', label: 'Evidence Log', icon: FileClock },
  { type: 'separator', label: 'AI Tools' },
  { href: '/ai-tools/schedule-optimizer', label: 'Schedule Optimizer', icon: Wand2 },
  { href: '/ai-tools/communication-coach', label: 'Communication Coach', icon: Wand2 },
  { href: '/evidence-ai', label: 'Evidence AI Assistant', icon: FileSearch },
  { href: '/document-analyzer', label: 'Document Analyzer', icon: FileSearch },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item, index) => {
        if (item.type === 'separator') {
          return (
            <div key={index} className="px-3 py-2">
                <p className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider group-data-[collapsible=icon]:hidden">{item.label}</p>
                 <Separator className="my-2 group-data-[collapsible=icon]:hidden"/>
            </div>
          )
        }
        return (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                    <Link href={item.href!}>
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  );
}
