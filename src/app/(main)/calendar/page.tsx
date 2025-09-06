// src/app/(main)/calendar/page.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format, isSameDay, getDay, isTuesday, isThursday, isSunday, getWeek, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Cake, Users, Handshake, Phone, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type CalendarEvent = {
  date: Date;
  type: 'custody' | 'alternate' | 'birthday' | 'facetime';
  title: string;
};

// --- Data based on family tree and user request ---
const familyBirthdays = [
    { name: "Harper Ryan", date: new Date(2025, 10, 12) }, // Nov 12
    { name: "Dad (Craig)", date: new Date(1990, 2, 23) },  // Mar 23
    { name: "Mom (Emma)", date: new Date(1995, 11, 15) }, // Dec 15
];

const custodyParents = {
    dad: { name: "Dad", color: "bg-blue-200 dark:bg-blue-800" },
    mom: { name: "Mom", color: "bg-pink-200 dark:bg-pink-800" },
    alternate: { name: "Alternate Block", color: "bg-gray-200 dark:bg-gray-700"}
};


// --- "Dad's Plan" Schedule Logic ---
const isDadsOnWeek = (date: Date) => {
    // Assuming week starts on Sunday. An even week number is an "on-week" for Dad's FaceTime.
    const weekNumber = getWeek(date, { weekStartsOn: 0 });
    return weekNumber % 2 === 0;
}

const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dayOfWeek = getDay(date); // Sunday = 0, Monday = 1, ...
    const events: CalendarEvent[] = [];

    // 1. Core Custody and Alternate Blocks
    if (isSunday(date)) {
        events.push({ date, type: 'custody', title: `Harper with ${custodyParents.dad.name}` });
    } else if (isTuesday(date) || isThursday(date)) {
        events.push({ date, type: 'alternate', title: custodyParents.alternate.name });
    } else {
        events.push({ date, type: 'custody', title: `Harper with ${custodyParents.mom.name}` });
    }

    // 2. Virtual Contact (FaceTime)
    const isSaturday = dayOfWeek === 6;
    if (isDadsOnWeek(date) && (isSaturday || isSunday(date))) {
        // On-week weekend FaceTime
        events.push({ date, type: 'facetime', title: 'FaceTime with Dad (8am-12pm)'});
    } else if (!isDadsOnWeek(date)) {
        // Off-week daily FaceTime
        events.push({ date, type: 'facetime', title: 'FaceTime with Dad (8am-12pm)'});
    }

    // 3. Birthdays
    familyBirthdays.forEach(bday => {
        if (date.getMonth() === bday.date.getMonth() && date.getDate() === bday.date.getDate()) {
             events.push({ date, type: 'birthday', title: `${bday.name}'s Birthday` });
        }
    });

    return events;
}


export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date("2025-09-06T00:00:00Z"));
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    document.title = "Calendar | Harper's Home";
    const today = date || new Date("2025-09-06T00:00:00Z");
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    const monthEvents: CalendarEvent[] = eachDayOfInterval({ start, end }).flatMap(getEventsForDate);
    setEvents(monthEvents);

  }, [date]);

  const handleRequestChange = () => {
    if (!date) return;
    const formattedDate = format(date, "MMMM do");
    const message = `I'd like to request a change for our schedule on ${formattedDate}. Would you be open to discussing it?`;
    // URL encode the message to pass it as a query parameter
    const encodedMessage = encodeURIComponent(message);
    router.push(`/communication?draft=${encodedMessage}`);
  };

  const dayHasEventType = (day: Date, eventType: CalendarEvent['type']) => {
      return events.some(e => isSameDay(e.date, day) && e.type === eventType);
  }

  const modifiers = {
      mom: (day: Date) => dayHasEventType(day, 'custody') && !isSunday(day),
      dad: isSunday,
      alternate: (day: Date) => isTuesday(day) || isThursday(day),
      birthday: (day: Date) => dayHasEventType(day, 'birthday'),
  };
  
  const modifiersClassNames = {
      mom: 'bg-pink-100 text-pink-900 dark:bg-pink-900/50 dark:text-pink-100 rounded-none',
      dad: 'bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-100 rounded-none',
      alternate: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-none',
      birthday: 'font-bold border-2 border-primary rounded-full',
  };

  const selectedDayEvents = date ? events.filter(e => isSameDay(e.date, date)) : [];


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">Family Calendar ("Dad's Plan")</h1>
        <p className="text-muted-foreground mt-1">
          Coordinate schedules, events, and memories based on the current plan.
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
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
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
                        <div className="w-4 h-4 rounded-full bg-gray-200 border"></div>
                        <span className="text-sm font-medium">{custodyParents.alternate.name}</span>
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
                                    {['custody', 'alternate'].includes(event.type) && (
                                        <div className="p-2 bg-muted rounded-full">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    )}
                                     {event.type === 'facetime' && (
                                        <div className="p-2 bg-muted rounded-full">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
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
                {date && (
                    <CardContent>
                        <Button className="w-full" onClick={handleRequestChange}>
                           <Handshake />
                            <span>Request Schedule Change</span>
                        </Button>
                    </CardContent>
                )}
             </Card>
        </div>
      </div>
    </div>
  );
}
