// src/app/(main)/calendar/page.tsx
'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import type { Metadata } from 'next';

// This is a client component, so metadata should be exported from a layout or page file if needed,
// but for a client component, we can manage the title using document.title if necessary.
// export const metadata: Metadata = {
//   title: "Calendar | Harper's Home",
// };

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  React.useEffect(() => {
    document.title = "Calendar | Harper's Home";
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Family Calendar</h1>
        <p className="text-muted-foreground mt-1">
          Coordinate schedules, events, and memories.
        </p>
      </div>
      <Card className="max-w-md">
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-4"
          />
        </CardContent>
      </Card>
    </div>
  );
}
