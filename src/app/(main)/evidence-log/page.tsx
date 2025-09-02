// src/app/(main)/evidence-log/page.tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const eventSchema = z.object({
  date: z.date(),
  category: z.enum(['Communication', 'Custody Exchange', 'Financial', 'Health', 'Other']),
  description: z.string().min(10, 'Please provide a detailed, factual description.'),
  evidence: z.string().optional(),
});

type EventEntry = z.infer<typeof eventSchema> & { loggedBy: string };

const initialEvents: EventEntry[] = [
    {
        date: new Date("2023-11-10"),
        category: "Communication",
        description: "Received a text message regarding a change in pickup time for Saturday.",
        evidence: "Screenshot of text message saved.",
        loggedBy: "Mom (Emma)"
    },
    {
        date: new Date("2023-11-08"),
        category: "Financial",
        description: "Paid for Harper's fall soccer league registration fee.",
        evidence: "Receipt saved as Soccer_Receipt.pdf",
        loggedBy: "Dad (Craig)"
    }
];


export default function EvidenceLogPage() {
    const [events, setEvents] = React.useState<EventEntry[]>(initialEvents);
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

    function onSubmit(values: z.infer<typeof eventSchema>) {
        // In a real app, we'd get the current user's name
        const loggedBy = "Mom (Emma)"; // Placeholder
        const newEvent: EventEntry = { ...values, loggedBy };
        setEvents(prev => [newEvent, ...prev].sort((a,b) => b.date.getTime() - a.date.getTime()));
        toast({
            title: "Event Logged",
            description: "Your new evidence entry has been saved.",
        });
        form.reset();
    }

    return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Evidence Log</h1>
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
                                          <SelectItem value="Communication">Communication</SelectItem>
                                          <SelectItem value="Custody Exchange">Custody Exchange</SelectItem>
                                          <SelectItem value="Financial">Financial</SelectItem>
                                          <SelectItem value="Health">Health</SelectItem>
                                          <SelectItem value="Other">Other</SelectItem>
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
                        <div className="space-y-6">
                            {events.length > 0 ? (
                                events.map((event, index) => (
                                    <div key={index} className="pb-4 border-b last:border-b-0">
                                        <p className="text-sm text-muted-foreground">{format(event.date, 'PPP')}</p>
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
                                <p className="text-muted-foreground text-center">No events logged yet.</p>
                            )}
                        </div>
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  );
}
