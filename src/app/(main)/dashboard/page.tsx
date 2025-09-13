// src/app/(main)/dashboard/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, differenceInMonths } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Utensils, BedDouble, Baby } from 'lucide-react';

// --- Data based on Harper being 10 months old as of Sept 6, 2025 ---
const harper_dob = new Date("2024-11-12");

// --- Infant Dashboard Component (0-24 months) ---
const InfantDashboard = () => (
    <div className="space-y-4">
       <h2 className="text-3xl font-bold tracking-tight">Welcome to Harper's Home!</h2>
       <p className="text-muted-foreground">Your one-stop dashboard for our amazing gal.</p>

        <Card className="bg-primary text-primary-foreground">
            <CardHeader>
                <CardTitle>Harper's Now: At-a-Glance</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <p className="text-sm font-semibold">LAST FEED</p>
                    <p className="text-2xl font-bold">08:00 AM</p>
                    <p className="text-xs opacity-80">45 mins ago</p>
                </div>
                 <div className="text-center">
                    <p className="text-sm font-semibold">LAST NAP</p>
                    <p className="text-2xl font-bold">09:11 AM</p>
                    <p className="text-xs opacity-80">For 45 mins</p>
                </div>
                 <div className="text-center">
                    <p className="text-sm font-semibold">LAST DIAPER</p>
                    <p className="text-2xl font-bold">08:30 AM</p>
                    <p className="text-xs opacity-80">Wet</p>
                </div>
            </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Up Next</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-4">
                       <Utensils className="w-6 h-6 text-primary"/>
                       <div>
                           <p className="font-semibold">Next Feeding</p>
                           <p className="text-muted-foreground text-sm">Around 11:00 AM</p>
                       </div>
                   </div>
                   <div className="flex items-center gap-4">
                       <BedDouble className="w-6 h-6 text-primary"/>
                       <div>
                           <p className="font-semibold">Next Nap</p>
                           <p className="text-muted-foreground text-sm">Around 11:30 AM</p>
                       </div>
                   </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Harper's Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-2">
                        <AvatarImage src="https://picsum.photos/seed/harper/200" data-ai-hint="child portrait" />
                        <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">Harper</p>
                    <p className="text-sm text-muted-foreground">7M 22D</p>
                    <p className="text-xs text-muted-foreground">{format(harper_dob, "MMMM d, yyyy")}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Latest Story</CardTitle>
                </CardHeader>
                 <CardContent>
                    <p className="text-sm text-muted-foreground">No new stories yet. Add one from the Journal!</p>
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
    const ageInMonths = differenceInMonths(new Date("2025-09-06T00:00:00Z"), harper_dob);
    
    let DashboardComponent;
    if (ageInMonths <= 24) {
        DashboardComponent = InfantDashboard;
    } else {
        DashboardComponent = SchoolAgeDashboard;
    }

    return <DashboardComponent />;
}
