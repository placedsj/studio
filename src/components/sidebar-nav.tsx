'use client';

import { usePathname } from 'next/navigation';
import { Home, Calendar, BookHeart, Landmark, TrendingUp, FileText, Baby, Heart, AlertTriangle, Users } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/journal', label: 'Journal', icon: BookHeart },
  { href: '/fund', label: 'Shared Fund', icon: Landmark },
  { href: '/milestones', label: 'Milestones', icon: TrendingUp },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/log', label: "Harper's Log", icon: Baby },
  { href: '/profile', label: "Harper's Profile", icon: Heart },
  { href: '/family-tree', label: 'Family Tree', icon: Users },
  { href: '/emergency', label: 'Emergency', icon: AlertTriangle },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label}>
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
