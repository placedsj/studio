
'use client';

import { usePathname } from 'next/navigation';
import { Home, Calendar, BookHeart, Landmark, TrendingUp, FileText, Baby, Heart, AlertTriangle, Users, MessagesSquare, Wand2, FileClock, ScanLine, FileSearch } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/journal', label: 'Journal', icon: BookHeart },
  { href: '/communication', label: 'Communication', icon: MessagesSquare },
  { href: '/fund', label: 'Shared Fund', icon: Landmark },
  { href: '/milestones', label: 'Milestones', icon: TrendingUp },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/evidence-log', label: 'Evidence Log', icon: FileClock },
  { href: '/evidence-ai', label: 'Evidence AI', icon: ScanLine },
  { href: '/document-analyzer', label: 'Document Analyzer', icon: FileSearch },
  { href: '/log', label: "Harper's Log", icon: Baby },
  { href: '/profile', label: "Harper's Profile", icon: Heart },
  { href: '/family-tree', label: 'Family Tree', icon: Users },
  { href: '/emergency', label: 'Emergency', icon: AlertTriangle },
  { href: '/schedule-optimizer', label: 'Schedule Optimizer', icon: Wand2 },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
