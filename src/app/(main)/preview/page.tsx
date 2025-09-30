// src/app/(main)/preview/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, ShieldCheck, Wand2, Calendar, Users, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Features Preview | Harper's Home",
};

const features = [
    {
        icon: Wand2,
        title: "AI-Powered Assistants",
        description: "From refining communication to optimizing schedules, our AI tools help you navigate co-parenting with confidence and clarity."
    },
    {
        icon: ShieldCheck,
        title: "Secure Evidence Logging",
        description: "Log events, upload evidence, and maintain a secure, chronological record. Our AI helps you categorize and summarize entries."
    },
    {
        icon: Calendar,
        title: "Collaborative Calendar",
        description: "Coordinate custody schedules, appointments, and important family events in one shared, easy-to-read calendar."
    },
    {
        icon: Users,
        title: "Shared Hubs",
        description: "Manage shared expenses, create grocery lists, build wishlists, and track health information in dedicated, collaborative spaces."
    },
    {
        icon: Heart,
        title: "Child-Focused Tools",
        description: "Keep the focus on Harper with a family journal for milestones, a dynamic dashboard, and a complete family tree."
    }
]

export default function PreviewPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-extra-bold uppercase tracking-tight">Features Preview</h1>
        <p className="text-muted-foreground mt-1">
            Discover the tools designed to make your co-parenting journey smoother.
        </p>
       </div>
       
       <Card className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
                <CardTitle className="text-3xl font-bold mb-4">Watch a Quick Tour</CardTitle>
                <CardDescription className="text-primary-foreground/80 max-w-2xl mb-6">
                    See how Harper's Home brings all your co-parenting needs into one beautiful, collaborative space. A short video walkthrough is coming soon!
                </CardDescription>
                <div className="w-full max-w-xl aspect-video bg-black/30 rounded-lg flex items-center justify-center">
                    <PlayCircle className="w-20 h-20 text-white/50" />
                </div>
            </div>
       </Card>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(feature => {
                const Icon = feature.icon;
                return (
                    <Card key={feature.title}>
                        <CardHeader className="flex flex-row items-center gap-4">
                             <div className="p-3 bg-accent/20 rounded-lg">
                                <Icon className="w-6 h-6 text-accent"/>
                            </div>
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                )
            })}
             <Card className="md:col-span-2 lg:col-span-3 bg-card/50 border-dashed flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">And much more...</h3>
                <p className="text-muted-foreground max-w-md">
                    This app is constantly growing. We're committed to building the most comprehensive and supportive co-parenting tool available.
                </p>
            </Card>
       </div>
    </div>
  );
}
