import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Calendar | Harper's Home",
};

const scheduleWeek1 = [
    { day: "Mon", parent: "Craig", initials: "CS" },
    { day: "Tue", parent: "Craig", initials: "CS" },
    { day: "Wed", parent: "Emma", initials: "ER" },
    { day: "Thu", parent: "Emma", initials: "ER" },
    { day: "Fri", parent: "Craig", initials: "CS" },
    { day: "Sat", parent: "Craig", initials: "CS" },
    { day: "Sun", parent: "Craig", initials: "CS" },
];

const scheduleWeek2 = [
    { day: "Mon", parent: "Emma", initials: "ER" },
    { day: "Tue", parent: "Emma", initials: "ER" },
    { day: "Wed", parent: "Craig", initials: "CS" },
    { day: "Thu", parent: "Craig", initials: "CS" },
    { day: "Fri", parent: "Emma", initials: "ER" },
    { day: "Sat", parent: "Emma", initials: "ER" },
    { day: "Sun", parent: "Emma", initials: "ER" },
];

const ScheduleDay = ({ day, parent, initials }: { day: string, parent: string, initials: string }) => (
    <div className="flex flex-col items-center p-4 border rounded-lg">
        <p className="font-semibold text-lg">{day}</p>
        <Avatar className="w-12 h-12 my-2">
            <AvatarFallback className={parent === "Emma" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}>
                {initials}
            </AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">{parent}</p>
    </div>
)

export default function CalendarPage() {
  return (
    <div className="space-y-8">
       <div>
         <h1 className="text-3xl font-bold font-headline tracking-tight">Family Calendar</h1>
         <p className="text-muted-foreground mt-1">
            Displaying the 2-3-2-2 custody schedule rotation.
        </p>
       </div>
       <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Week 1</CardTitle>
                <CardDescription>Craig: 5 nights | Emma: 2 nights</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-4">
                    {scheduleWeek1.map(item => <ScheduleDay key={item.day} {...item} />)}
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Week 2</CardTitle>
                 <CardDescription>Emma: 5 nights | Craig: 2 nights</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid grid-cols-7 gap-4">
                    {scheduleWeek2.map(item => <ScheduleDay key={item.day} {...item} />)}
                </div>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
