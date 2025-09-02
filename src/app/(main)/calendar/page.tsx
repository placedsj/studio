// src/app/(main)/calendar/page.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay } from 'date-fns';
import { Cake, User, Users } from 'lucide-react';

type CalendarEvent = {
  date: Date;
  type: 'custody' | 'birthday' | 'holiday';
  title: string;
};

// --- Data based on family tree and user request ---
const familyBirthdays = [
    { name: "Harper Ryan", date: new Date(2024, 10, 12) }, // Nov 12
    { name: "Dad (Craig)", date: new Date(1990, 2, 23) },  // Mar 23
    { name: "Mom (Emma)", date: new Date(1995, 11, 15) }, // Dec 15
];

const custodyParents = {
    dad: { name: "Dad", color: "bg-blue-200 dark:bg-blue-800" },
    mom: { name: "Mom", color: "bg-pink-200 dark:bg-pink-800" },
};

// --- Custody Schedule Logic ---
// 2-2-5-5 schedule repeats every 14 days
const scheduleRotation = [
    custodyParents.mom, custodyParents.mom, // Mon, Tue (2)
    custodyParents.dad, custodyParents.dad, // Wed, Thu (2)
    custodyParents.mom, custodyParents.mom, custodyParents.mom, // Fri, Sat, Sun (3) -> This is a 2-2-3
    custodyParents.dad, custodyParents.dad, // Mon, Tue (2)
    custodyParents.mom, custodyParents.mom, // Wed, Thu (2)
    custodyParents.dad, custodyParents.dad, custodyParents.dad, // Fri, Sat, Sun (3) -> This is a 2-2-3
];
const scheduleStartDate = new Date(2024, 0, 1); // Start on Jan 1, 2024 (a Monday)

const getCustodyForDate = (date: Date) => {
    const dayDiff = Math.floor((date.getTime() - scheduleStartDate.getTime()) / (1000 * 60 * 60 * 24));
    const scheduleIndex = (dayDiff % 14 + 14) % 14; // Ensure positive index
    return scheduleRotation[scheduleIndex];
};


export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);

  React.useEffect(() => {
    document.title = "Calendar | Harper's Home";
    const today = date || new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthEvents: CalendarEvent[] = [];
    
    let currentDay = new Date(startOfMonth);
    while (currentDay <= endOfMonth) {
        // Add custody events
        const custody = getCustodyForDate(currentDay);
        monthEvents.push({
            date: new Date(currentDay),
            type: 'custody',
            title: `Harper with ${custody.name}`
        });

        // Add birthday events (for any year)
        familyBirthdays.forEach(bday => {
            if (currentDay.getMonth() === bday.date.getMonth() && currentDay.getDate() === bday.date.getDate()) {
                 monthEvents.push({
                    date: new Date(currentDay),
                    type: 'birthday',
                    title: `${bday.name}'s Birthday`
                });
            }
        });
        currentDay.setDate(currentDay.getDate() + 1);
    }
    
    setEvents(monthEvents);

  }, [date]);

  const custodyModifiers = {
      mom: (day: Date) => getCustodyForDate(day) === custodyParents.mom,
      dad: (day: Date) => getCustodyForDate(day) === custodyParents.dad,
  };
  
  const custodyModifiersClassNames = {
      mom: 'bg-pink-100 text-pink-900 dark:bg-pink-900/50 dark:text-pink-100 rounded-none',
      dad: 'bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-100 rounded-none',
  };

  const birthdayModifier = (day: Date) => {
    return familyBirthdays.some(bday => 
        day.getMonth() === bday.date.getMonth() && day.getDate() === bday.date.getDate()
    );
  };
  const birthdayModifiersClassNames = {
      birthday: 'font-bold border-2 border-primary rounded-full',
  }

  const selectedDayEvents = date ? events.filter(e => isSameDay(e.date, date)) : [];


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">Family Calendar</h1>
        <p className="text-muted-foreground mt-1">
          Coordinate schedules, events, and memories.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-4"
              modifiers={{ ...custodyModifiers, birthday: birthdayModifier }}
              modifiersClassNames={{ ...custodyModifiersClassNames, ...birthdayModifiersClassNames }}
            />
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Schedule Key</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-pink-100 border"></div>
                        <span className="text-sm font-medium">{custodyParents.mom.name}'s Time</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-100 border"></div>
                        <span className="text-sm font-medium">{custodyParents.dad.name}'s Time</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                            <Cake className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Birthday</span>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>
                        {date ? format(date, 'MMMM do, yyyy') : 'Select a date'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {selectedDayEvents.length > 0 ? (
                        <ul className="space-y-3">
                            {selectedDayEvents.map((event, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    {event.type === 'custody' && (
                                        <div className="p-2 bg-muted rounded-full">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    )}
                                    {event.type === 'birthday' && (
                                         <div className="p-2 bg-primary/20 rounded-full">
                                            <Cake className="w-4 h-4 text-primary" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium">{event.title}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No events for this day.</p>
                    )}
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
