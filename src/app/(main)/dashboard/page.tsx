// src/app/(main)/dashboard/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Baby, Calendar, FileClock, HeartPulse, Stethoscope, BookHeart, TrendingUp, Utensils, BedDouble, PlusCircle, ListChecks } from 'lucide-react';
import Link from 'next/link';
import { format, differenceInMonths } from 'date-fns';
import { Calendar as MiniCalendar } from '@/components/ui/calendar';
import React from 'react';
import { Badge } from '@/components/ui/badge';

// --- Data based on Harper being 10 months old ---
const harper_dob = new Date("2023-11-12"); // Set to make her ~10 months old in Sept 2024

// --- Mock Data for Infant Dashboard ---
const recentLogs = [
    { time: "13:30", type: "Sleep", icon: BedDouble, details: "Woke up from nap" },
    { time: "12:00", type: "Feeding", icon: Utensils, details: "Ate solid foods (peas)" },
    { time: "11:00", type: "Sleep", icon: BedDouble, details: "Started nap" },
];

const upcomingAppointments = [
    { date: new Date(new Date().setDate(new Date().getDate() + 5)), icon: Stethoscope, title: "10-Month Well-Child Visit", doctor: "Dr. Emily Carter" },
];

const recentMilestones = [
    { title: "Started Crawling", date: new Date("2024-08-15") },
    { title: "First Solid Foods", date: new Date("2024-06-20") },
];

const quickLinks = [
    { href: "/log", icon: Baby, title: "Harper's Log", description: "Track daily activities." },
    { href: "/health", icon: HeartPulse, title: "Health Hub", description: "View medical records." },
    { href: "/milestones", icon: TrendingUp, title: "Milestones", description: "See developmental progress." },
    { href: "/journal", icon: BookHeart, title: "Family Journal", description: "Share precious moments." },
    { href: "/calendar", icon: Calendar, title: "Family Calendar", description: "Coordinate schedules." },
    { href: "/shared-lists", icon: ListChecks, title: "Shared Lists", description: "Groceries & wishlists." },
    { href: "/evidence-log", icon: FileClock, title: "Evidence Log", description: "Record important events." },
];


// --- Infant Dashboard Component (0-24 months) ---
const InfantDashboard = () => (
    <div className="grid gap-6 lg:grid-cols-3">
        {/* Column 1: Recent Logs & Appointments */}
        <div className="space-y-6 lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>From Harper's Log.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {recentLogs.map((log, index) => (
                             <li key={index} className="flex items-start gap-4">
                                <div className="p-3 bg-muted rounded-lg mt-1">
                                    <log.icon className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold">{log.type}</p>
                                    <p className="text-sm text-muted-foreground">{log.details}</p>
                                    <p className="text-xs text-muted-foreground/80">{log.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                     <Button asChild className="w-full mt-4">
                        <Link href="/log"><PlusCircle /><span>Add to Log</span></Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {upcomingAppointments.map((event, index) => (
                             <li key={index} className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg mt-1">
                                    <event.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">with {event.doctor}</p>
                                    <p className="text-xs text-muted-foreground/80">{format(event.date, 'EEEE, MMM d')}</p>
                                </div>
                            </li>
                        ))}
                         <li className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg mt-1">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold">Next Custody Exchange</p>
                                <p className="text-sm text-muted-foreground">with Mom</p>
                                <p className="text-xs text-muted-foreground/80">{format(new Date(new Date().setDate(new Date().getDate() + 2)), 'EEEE, MMM d')}</p>
                            </div>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        {/* Column 2: Quick Links & Mini Calendar */}
        <div className="space-y-6 lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="divide-y">
                        {quickLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="flex items-center gap-4 p-3 -mx-3 hover:bg-accent/50 rounded-lg transition-colors">
                                    <div className="p-3 bg-muted rounded-lg">
                                        <link.icon className="w-5 h-5 text-muted-foreground" />
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

         {/* Column 3: Mini Calendar & Milestones */}
        <div className="space-y-6 lg:col-span-1">
             <Card>
                <CardContent className="p-0">
                    <MiniCalendar
                        mode="single"
                        selected={new Date()}
                        className="p-3"
                        modifiers={{
                            custody_mom: (day: Date) => day.getDay() % 3 === 0, // Mocking some custody days
                            custody_dad: (day: Date) => day.getDay() % 3 === 1, // Mocking some custody days
                        }}
                        modifiersClassNames={{
                            custody_mom: 'bg-pink-100 dark:bg-pink-900/50',
                            custody_dad: 'bg-blue-100 dark:bg-blue-900/50',
                        }}
                    />
                </CardContent>
                 <CardContent className="flex justify-center gap-4 text-xs">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-pink-100 border"/>Mom's Time</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-100 border"/>Dad's Time</div>
                 </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                       {recentMilestones.map((milestone, index) => (
                             <li key={index} className="flex items-start gap-4">
                                <div className="p-3 bg-accent rounded-lg mt-1">
                                    <TrendingUp className="w-5 h-5 text-accent-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold">{milestone.title}</p>
                                    <p className="text-xs text-muted-foreground/80">{format(milestone.date, 'PPP')}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                     <Button asChild variant="secondary" className="w-full mt-4">
                        <Link href="/milestones">View all milestones</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
);

// --- School-Age Dashboard Component (Placeholder for future) ---
const SchoolAgeDashboard = () => (
    <Card>
        <CardHeader>
            <CardTitle>School-Age Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
            <p>This dashboard will show custody schedules, school events, shared funds, etc.</p>
        </CardContent>
    </Card>
);


export default function DashboardPage() {
    const ageInMonths = differenceInMonths(new Date(), harper_dob);
    
    let DashboardComponent;
    if (ageInMonths <= 24) {
        DashboardComponent = InfantDashboard;
    } else {
        // This is where you'd add logic for Toddler, Preschool, etc.
        DashboardComponent = SchoolAgeDashboard;
    }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground mt-1">
          Here's a quick overview of Harper's world, tailored for her current age.
        </p>
      </div>
      <DashboardComponent />
    </div>
  );
}
