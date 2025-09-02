// src/app/(main)/evidence-log/page.tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar as CalendarIcon, Filter, ArrowUpDown } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

const eventSchema = z.object({
  date: z.date(),
  category: z.enum(['Communication', 'Custody Exchange', 'Financial', 'Health', 'Other']),
  description: z.string().min(10, 'Please provide a detailed, factual description.'),
  evidence: z.string().optional(),
});

type EventEntry = z.infer<typeof eventSchema> & { loggedBy: string };
type SortOrder = 'desc' | 'asc';

const initialEvents: EventEntry[] = [
    {
        date: new Date("2023-11-10T10:00:00Z"),
        category: "Communication",
        description: "Received a text message regarding a change in pickup time for Saturday.",
        evidence: "Screenshot of text message saved.",
        loggedBy: "Mom (Emma)"
    },
    {
        date: new Date("2023-11-08T15:30:00Z"),
        category: "Financial",
        description: "Paid for Harper's fall soccer league registration fee.",
        evidence: "Receipt saved as Soccer_Receipt.pdf",
        loggedBy: "Dad (Craig)"
    },
     {
        date: new Date("2023-11-12T18:00:00Z"),
        category: "Custody Exchange",
        description: "Dad was 15 minutes late for the custody exchange at the library.",
        evidence: "Documented time of arrival.",
        loggedBy: "Mom (Emma)"
    },
    {
        date: new Date("2023-10-25T09:00:00Z"),
        category: "Health",
        description: "Took Harper to her annual check-up. Doctor noted she is healthy.",
        evidence: "Check-up summary from Dr. Carter's office.",
        loggedBy: "Dad (Craig)"
    }
];

const categories = ['Communication', 'Custody Exchange', 'Financial', 'Health', 'Other'] as const;
const users = ['Mom (Emma)', 'Dad (Craig)'] as const;


export default function EvidenceLogPage() {
    const [events, setEvents] = React.useState<EventEntry[]>(initialEvents);
    const [filteredEvents, setFilteredEvents] = React.useState<EventEntry[]>(initialEvents);
    const [categoryFilter, setCategoryFilter] = React.useState<string>('all');
    const [userFilter, setUserFilter] = React.useState<string>('all');
    const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc');

    const { toast } = useToast();

    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            date: new Date(),
            category: 'Communication',
            description: '',
            evidence: '',
        },
    });

    React.useEffect(() => {
        let result = [...events];

        if (categoryFilter !== 'all') {
            result = result.filter(event => event.category === categoryFilter);
        }

        if (userFilter !== 'all') {
            result = result.filter(event => event.loggedBy === userFilter);
        }

        result.sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.date.getTime() - a.date.getTime();
            }
            return a.date.getTime() - b.date.getTime();
        });

        setFilteredEvents(result);

    }, [events, categoryFilter, userFilter, sortOrder]);


    function onSubmit(values: z.infer<typeof eventSchema>) {
        // In a real app, we'd get the current user's name
        const loggedBy = "Mom (Emma)"; // Placeholder
        const newEvent: EventEntry = { ...values, loggedBy };
        setEvents(prev => [newEvent, ...prev]);
        toast({
            title: "Event Logged",
            description: "Your new evidence entry has been saved.",
        });
        form.reset();
    }
    
    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    }

    return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">Evidence Log</h1>
            <p className="text-muted-foreground mt-1">
                A secure and chronological record of co-parenting events.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Log New Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name="date"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <FormLabel>Date of Event</FormLabel>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant={"outline"}
                                              className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                              )}
                                            >
                                              {field.value ? (
                                                format(field.value, "PPP")
                                              ) : (
                                                <span>Pick a date</span>
                                              )}
                                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                          <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date()}
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="category"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Category</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Description</FormLabel>
                                      <FormControl>
                                        <Textarea rows={5} placeholder="Describe the event in factual detail..." {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                 <FormField
                                  control={form.control}
                                  name="evidence"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Supporting Evidence</FormLabel>
                                      <FormControl>
                                        <Textarea rows={3} placeholder="e.g., Text message screenshot saved on 11/10/23..." {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button type="submit" className="w-full">
                                    <PlusCircle />
                                    <span>Save Event</span>
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Event History</CardTitle>
                        <CardDescription>A chronological log of all recorded events.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4 p-4 bg-muted/50 rounded-lg border">
                            <div className="flex-1">
                                <Label htmlFor="category-filter">Filter by Category</Label>
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger id="category-filter">
                                        <SelectValue placeholder="Select category..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="user-filter">Filter by User</Label>
                                <Select value={userFilter} onValueChange={setUserFilter}>
                                    <SelectTrigger id="user-filter">
                                        <SelectValue placeholder="Select user..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Users</SelectItem>
                                        {users.map(user => <SelectItem key={user} value={user}>{user}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button variant="outline" onClick={toggleSortOrder} className="w-full sm:w-auto">
                                    <ArrowUpDown />
                                    <span>Sort by Date ({sortOrder === 'desc' ? 'Newest' : 'Oldest'})</span>
                                </Button>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event, index) => (
                                    <div key={index} className="pb-4 border-b last:border-b-0">
                                        <p className="text-sm text-muted-foreground">{format(event.date, 'PPP p')}</p>
                                        <p className="font-semibold text-lg">{event.category}</p>
                                        <p className="mt-1 whitespace-pre-wrap text-sm">{event.description}</p>
                                        {event.evidence && (
                                            <div className="text-sm mt-2 text-muted-foreground bg-accent/50 p-2 rounded-md">
                                                <span className="font-semibold">Evidence Note:</span> {event.evidence}
                                            </div>
                                        )}
                                        <p className="text-xs text-muted-foreground mt-2 text-right">Logged by {event.loggedBy}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted-foreground py-16">
                                    <Filter className="mx-auto mb-2" />
                                    <p className="font-semibold">No Matching Events</p>
                                    <p className="text-sm">Try adjusting your filters.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  );
}
