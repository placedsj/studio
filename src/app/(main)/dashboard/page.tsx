// src/app/(main)/dashboard/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookHeart, Calendar, FileClock, Landmark, MessagesSquare, TrendingUp, Cake, Users, Handshake, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { format, addDays } from 'date-fns';

export const metadata: Metadata = {
  title: "Dashboard | Harper's Home",
};

const quickLinks = [
    { href: "/calendar", icon: Calendar, title: "Family Calendar", description: "View custody schedules & birthdays." },
    { href: "/communication", icon: MessagesSquare, title: "Communication Hub", description: "Message the other parent." },
    { href: "/journal", icon: BookHeart, title: "Family Journal", description: "Share precious moments." },
    { href: "/fund", icon: Landmark, title: "Shared Fund", description: "Manage shared expenses." },
    { href: "/milestones", icon: TrendingUp, title: "Milestones", description: "Track developmental progress." },
    { href: "/evidence-log", icon: FileClock, title: "Evidence Log", description: "Record important events." },
];

const upcomingEvents = [
    { date: new Date(), icon: Handshake, title: "Custody Exchange", description: "Dad's week begins." },
    { date: addDays(new Date(), 2), icon: CheckCircle, title: "Soccer Practice", description: "4:00 PM at the park." },
    { date: addDays(new Date(), 5), icon: Cake, title: "Harper's Birthday Party", description: "2:00 PM at Mom's house." },
];

const recentMilestone = {
    category: 'Achievement',
    title: "Learned to Ride a Bike",
    date: new Date("2023-09-10"),
    description: "Rode without training wheels for the first time at the park."
};

const fundBalance = 339.50;


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground mt-1">
          Here's a quick overview of your co-parenting landscape.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Column 1: Upcoming Events & Shared Fund */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>What's happening this week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {upcomingEvents.map((event, index) => (
                             <li key={index} className="flex items-start gap-4">
                                <div className="p-3 bg-muted rounded-lg mt-1">
                                    <event.icon className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">{event.description}</p>
                                    <p className="text-xs text-muted-foreground/80">{format(event.date, 'EEEE, MMM d')}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Shared Fund</CardTitle>
                    <CardDescription>Current balance for shared expenses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">${fundBalance.toFixed(2)}</p>
                    <Link href="/fund" className="text-sm font-medium text-primary hover:underline mt-2 inline-block">
                        View all transactions
                    </Link>
                </CardContent>
            </Card>
        </div>
        
        {/* Column 2: Quick Links */}
        <div className="space-y-6">
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

         {/* Column 3: Journal & Milestone */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Journal Entry</CardTitle>
                    <CardDescription>A glimpse of the latest shared memory.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Image src="https://picsum.photos/400/200" data-ai-hint="soccer goal" alt="Harper's First Soccer Goal!" width={400} height={200} className="rounded-lg object-cover w-full aspect-video" />
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
             <Card>
                <CardHeader>
                    <CardTitle>Recent Milestone</CardTitle>
                    <CardDescription>Celebrating the latest achievement.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Badge variant="secondary">{recentMilestone.category}</Badge>
                        <h3 className="font-semibold text-lg">{recentMilestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{recentMilestone.description}</p>
                        <p className="text-xs text-muted-foreground pt-1">{format(recentMilestone.date, 'PPP')}</p>
                         <Link href="/milestones" className="text-sm font-medium text-primary hover:underline pt-2 block">
                            View all milestones
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>

    </div>
  );
}
