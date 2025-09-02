import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Calendar | Harper's Home",
};

export default function CalendarPage() {
  return (
    <div className="space-y-8">
       <h1 className="text-3xl font-bold font-headline tracking-tight">Family Calendar</h1>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-12 space-y-4 rounded-lg border-2 border-dashed">
            <CalendarIcon className="w-16 h-16" />
            <p className="font-medium">Our interactive family calendar is under construction.</p>
            <p>Soon you'll be able to manage custody schedules, family visits, and important events here.</p>
          </div>
        </CardContent>
       </Card>
    </div>
  );
}
