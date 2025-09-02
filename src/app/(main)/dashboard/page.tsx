// src/app/(main)/dashboard/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookHeart, Calendar, FileText, Landmark, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Dashboard | Harper's Home",
};

const quickLinks = [
    { href: "/calendar", icon: Calendar, title: "Family Calendar", description: "View custody schedules & birthdays." },
    { href: "/journal", icon: BookHeart, title: "Family Journal", description: "Share precious moments." },
    { href: "/fund", icon: Landmark, title: "Shared Fund", description: "Manage shared expenses." },
    { href: "/milestones", icon: TrendingUp, title: "Milestones", description: "Track developmental progress." },
    { href: "/documents", icon: FileText, title: "Secure Documents", description: "Store important files safely." },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground mt-1">
          Here's a quick overview of your co-parenting landscape.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
             <Card className="h-full">
                <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                    <CardDescription>Navigate to key sections of your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="divide-y">
                        {quickLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="flex items-center gap-4 p-4 -mx-4 hover:bg-accent/50 rounded-lg transition-colors">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <link.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{link.title}</p>
                                        <p className="text-sm text-muted-foreground">{link.description}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardContent>
             </Card>
        </div>
        <div className="lg:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Recent Journal Entry</CardTitle>
                    <CardDescription>A glimpse of the latest shared memory.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <img src="https://picsum.photos/400/200" data-ai-hint="soccer goal" alt="Harper's First Soccer Goal!" className="rounded-lg object-cover w-full aspect-video" />
                        <div className="space-y-1">
                             <h3 className="font-semibold">Harper's First Soccer Goal!</h3>
                             <p className="text-sm text-muted-foreground">So proud of Harper today! She scored her very first goal...</p>
                        </div>
                        <Link href="/journal" className="text-sm font-medium text-primary hover:underline">
                            View all entries
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>

    </div>
  );
}
