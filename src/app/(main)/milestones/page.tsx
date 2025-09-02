import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Stethoscope, Ruler, PlusCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Milestones | FamilyVerse',
};

export default function MilestonesPage() {
  const milestones = [
    { icon: Trophy, title: "First Steps", date: "June 5, 2022", description: "Harper took her first unassisted steps today!" },
    { icon: Stethoscope, title: "Annual Check-up", date: "August 20, 2023", description: "Everything looks great. Next appointment in one year." },
    { icon: Ruler, title: "Height: 45 inches", date: "August 20, 2023", description: "Grew 2 inches since last year." },
    { icon: Trophy, title: "Learned to Ride a Bike", date: "September 10, 2023", description: "Rode without training wheels for the first time at the park." },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Developmental Milestones</h1>
        <Button>
            <PlusCircle />
            <span>Add Milestone</span>
        </Button>
      </div>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone, index) => (
            <Card key={index}>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle>{milestone.title}</CardTitle>
                            <CardDescription>{milestone.date}</CardDescription>
                        </div>
                        <div className="p-3 bg-accent/50 rounded-lg">
                            <milestone.icon className="w-5 h-5 text-accent-foreground" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{milestone.description}</p>
                </CardContent>
            </Card>
        ))}
       </div>
    </div>
  );
}
