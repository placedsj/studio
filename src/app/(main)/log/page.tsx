import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, BedDouble, Utensils, Baby } from 'lucide-react';
import type { Metadata } from 'next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AiSleepSuggestor } from '@/components/ai-sleep-suggestor';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: "Harper's Log | Harper's Home",
};

export default function LogPage() {
    const logs = [
        { time: "8:15 AM", type: "Feeding", icon: Utensils, details: "6 oz formula" },
        { time: "8:45 AM", type: "Diaper", icon: Baby, details: "Wet" },
        { time: "9:30 AM", type: "Sleep", icon: BedDouble, details: "Started nap" },
        { time: "10:45 AM", type: "Sleep", icon: BedDouble, details: "Woke up from nap" },
    ];
    
    const logSummary = logs.map(log => `${log.time} - ${log.type}: ${log.details}`).join('\n');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Harper's Log</h1>
            <p className="text-muted-foreground mt-1">
                A real-time log of feedings, sleep, and diaper changes.
            </p>
        </div>
        <Button>
            <PlusCircle />
            <span>Add Log Entry</span>
        </Button>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Today's Log</CardTitle>
                    <CardDescription>Sunday, November 12, 2023</CardDescription>
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
