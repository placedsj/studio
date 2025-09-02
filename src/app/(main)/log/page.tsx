// src/app/(main)/log/page.tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, BedDouble, Utensils, Baby, type LucideIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AiSleepSuggestor } from '@/components/ai-sleep-suggestor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const logSchema = z.object({
  time: z.string().min(1, 'Time is required.'),
  type: z.enum(['Feeding', 'Diaper', 'Sleep']),
  details: z.string().min(1, 'Details are required.'),
});

type LogEntry = z.infer<typeof logSchema> & { icon: LucideIcon };

const initialLogs: LogEntry[] = [
    { time: "10:45 AM", type: "Sleep", icon: BedDouble, details: "Woke up from nap" },
    { time: "9:30 AM", type: "Sleep", icon: BedDouble, details: "Started nap" },
    { time: "8:45 AM", type: "Diaper", icon: Baby, details: "Wet" },
    { time: "8:15 AM", type: "Feeding", icon: Utensils, details: "6 oz formula" },
];

const iconMap: Record<string, LucideIcon> = {
    Feeding: Utensils,
    Diaper: Baby,
    Sleep: BedDouble,
};

export default function LogPage() {
    const [logs, setLogs] = React.useState<LogEntry[]>(initialLogs);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { toast } = useToast();
    
    const logSummary = logs.map(log => `${log.time} - ${log.type}: ${log.details}`).join('\n');

    const form = useForm<z.infer<typeof logSchema>>({
        resolver: zodResolver(logSchema),
        defaultValues: {
            time: format(new Date(), 'hh:mm a'),
            type: 'Feeding',
            details: '',
        },
    });

    function onSubmit(values: z.infer<typeof logSchema>) {
        const newEntry: LogEntry = {
            ...values,
            icon: iconMap[values.type],
        };
        setLogs(prev => [newEntry, ...prev]);
        toast({
            title: "Log Entry Added!",
            description: `Successfully added "${values.type}" log.`,
        });
        form.reset({
             time: format(new Date(), 'hh:mm a'),
             type: 'Feeding',
             details: '',
        });
        setIsDialogOpen(false);
    }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Harper's Log</h1>
            <p className="text-muted-foreground mt-1">
                A real-time log of feedings, sleep, and diaper changes.
            </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle />
                    <span>Add Log Entry</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Log Entry</DialogTitle>
                    <DialogDescription>Record a new activity for Harper.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Log Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a log type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Feeding">Feeding</SelectItem>
                                  <SelectItem value="Diaper">Diaper</SelectItem>
                                  <SelectItem value="Sleep">Sleep</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="details"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Details</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 6 oz formula" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save Entry</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Today's Log</CardTitle>
                    <CardDescription>{format(new Date(), 'PPPP')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Time</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{log.time}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <log.icon className="w-4 h-4 text-muted-foreground" />
                                            <span>{log.type}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{log.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <AiSleepSuggestor recentLogs={logSummary} />
        </div>
      </div>
    </div>
  );
}
