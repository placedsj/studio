// src/components/sidebar-nav.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Home, Calendar, BookHeart, Landmark, TrendingUp, Baby, Heart, AlertTriangle, Users, MessagesSquare, ScanLine, FileSearch, ChevronDown, LayoutDashboard, HeartPulse, Gavel, FileClock, Wand2
} from 'lucide-react';
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navGroups = [
  {
    title: 'Daily',
    icon: LayoutDashboard,
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: Home },
      { href: '/calendar', label: 'Calendar', icon: Calendar },
      { href: '/log', label: "Harper's Log", icon: Baby },
      { href: '/milestones', label: 'Milestones', icon: TrendingUp },
      { href: '/journal', label: 'Journal', icon: BookHeart },
    ],
  },
  {
    title: 'Communication',
    icon: MessagesSquare,
    items: [
        { href: '/communication', label: 'Communication Hub', icon: MessagesSquare },
    ]
  },
  {
      title: 'Health & Info',
      icon: HeartPulse,
      items: [
          { href: '/health', label: 'Health Hub', icon: HeartPulse },
          { href: '/profile', label: "Harper's Profile", icon: Heart },
          { href: '/family-tree', label: 'Family Tree', icon: Users },
          { href: '/emergency', label: 'Emergency', icon: AlertTriangle },
      ]
  },
  {
    title: 'Financial',
    icon: Landmark,
    items: [
      { href: '/fund', label: 'Shared Fund', icon: Landmark },
      { href: '/shared-lists', label: 'Shared Lists', icon: ScanLine },
    ]
  },
  {
      title: 'Legal & Evidence',
      icon: Gavel,
      items: [
          { href: '/evidence-log', label: 'Evidence Log', icon: FileClock },
      ]
  },
  {
    title: 'AI Tools',
    icon: Wand2,
    items: [
        { href: '/ai-tools/schedule-optimizer', label: 'Schedule Optimizer', icon: Wand2 },
        { href: '/ai-tools/communication-coach', label: 'Communication Coach', icon: Wand2 },
        { href: '/evidence-ai', label: 'Evidence AI Assistant', icon: FileSearch },
        { href: '/document-analyzer', label: 'Document Analyzer', icon: FileSearch },
    ]
  }
];

export function SidebarNav() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    const activeGroup = navGroups.find(group => group.items.some(item => pathname.startsWith(item.href)));
    // Default open groups
    const defaultOpen = ['Daily', 'Communication', 'Health & Info', 'Legal & Evidence', 'AI Tools'];
    if (activeGroup && !defaultOpen.includes(activeGroup.title)) {
        return [...defaultOpen, activeGroup.title];
    }
    return defaultOpen;
  });

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  }

  return (
    <SidebarMenu>
      {navGroups.map((group) => (
        <Collapsible key={group.title} open={openGroups.includes(group.title)} onOpenChange={() => toggleGroup(group.title)}>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="justify-between">
                        <div className="flex items-center gap-2">
                            <group.icon />
                            <span>{group.title}</span>
                        </div>
                        <ChevronDown className={cn("transition-transform", openGroups.includes(group.title) && "rotate-180")} />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
            </SidebarMenuItem>

            <CollapsibleContent>
                <div className="pl-6 py-1 space-y-1 border-l ml-4">
                    {group.items.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                                <Link href={item.href}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}
