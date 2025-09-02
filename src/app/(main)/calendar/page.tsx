// src/app/(main)/calendar/page.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Cake } from 'lucide-react';

type CalendarEvent = {
  date: Date;
  type: 'custody' | 'birthday' | 'holiday';
  title: string;
};

// --- Data based on family tree and user request ---
const familyBirthdays = [
    { name: "Harper Ryan", date: new Date(2024, 10, 12) }, // Nov 12
    { name: "Craig Schulz", date: new Date(1990, 2, 23) },  // Mar 23
    { name: "Emma Ryan", date: new Date(1995, 11, 15) }, // Dec 15
];

const custodyParents = {
    craig: { name: "Craig Schulz", color: "bg-blue-200 dark:bg-blue-800" },
    emma: { name: "Emma Ryan", color: "bg-pink-200 dark:bg-pink-800" },
};

// --- Custody Schedule Logic ---
// 2-3-2-2 schedule repeats every 14 days
const scheduleRotation = [
    custodyParents.emma, custodyParents.emma, // Mon, Tue (2)
    custodyParents.craig, custodyParents.craig, // Wed, Thu (2)
    custodyParents.emma, custodyParents.emma, custodyParents.emma, // Fri, Sat, Sun (3)
    custodyParents.craig, custodyParents.craig, // Mon, Tue (2)
    custodyParents.emma, custodyParents.emma, // Wed, Thu (2)
    custodyParents.craig, custodyParents.craig, custodyParents.craig, // Fri, Sat, Sun (3)
];

// Let's set a fixed start date for the rotation to be consistent
const scheduleStartDate = startOfWeek(new Date(2024, 0, 1), { weekStartsOn: 1 }); // Start on a Monday

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

    // Generate events for the current month
    const today = date || new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthEvents: CalendarEvent[] = [];
    
    // Add custody events
    for (let day = startOfMonth; day <= endOfMonth; day.setDate(day.getDate() + 1)) {
        const custody = getCustodyForDate(new Date(day));
        monthEvents.push({
            date: new Date(day),
            type: 'custody',
            title: `${custody.name}'s Day`
        });
    }

    // Add birthday events (for any year)
    familyBirthdays.forEach(bday => {
        const bdayThisMonth = new Date(today.getFullYear(), bday.date.getMonth(), bday.date.getDate());
        if (bdayThisMonth >= startOfMonth && bdayThisMonth <= endOfMonth) {
            monthEvents.push({
                date: bdayThisMonth,
                type: 'birthday',
                title: `${bday.name}'s Birthday`
            });
        }
    });
    
    setEvents(monthEvents);

  }, [date]);

  const custodyModifiers = {
      emma: (day: Date) => getCustodyForDate(day) === custodyParents.emma,
      craig: (day: Date) => getCustodyForDate(day) === custodyParents.craig,
  };
  
  const custodyModifiersClassNames = {
      emma: 'bg-pink-100 text-pink-900 dark:bg-pink-900/50 dark:text-pink-100 rounded-none',
      craig: 'bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-100 rounded-none',
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
        <h1 className="text-3xl font-bold font-headline tracking-tight">Family Calendar</h1>
        <p className="text-muted-foreground mt-1">
          Coordinate schedules, events, and memories.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
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
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-pink-100 border"></div>
                        <span className="text-sm">{custodyParents.emma.name}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-100 border"></div>
                        <span className="text-sm">{custodyParents.craig.name}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-primary"></div>
                        <span className="text-sm">Birthday</span>
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
                        <ul className="space-y-2">
                            {selectedDayEvents.map((event, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    {event.type === 'custody' && (
                                        <Badge variant={event.title.includes('Emma') ? 'secondary' : 'default'} className={event.title.includes('Emma') ? 'bg-pink-100 text-pink-900' : 'bg-blue-100 text-blue-900'}>Custody</Badge>
                                    )}
                                    {event.type === 'birthday' && (
                                        <Badge variant="default" className="bg-primary/20 text-primary-foreground"><Cake /></Badge>
                                    )}
                                    <span className="text-sm">{event.title}</span>
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
