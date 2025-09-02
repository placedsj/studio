// src/app/(main)/milestones/page.tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Stethoscope, Ruler, PlusCircle, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const milestoneSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  date: z.date(),
  description: z.string().min(1, 'Description is required.'),
  category: z.enum(['Achievement', 'Health', 'Growth']),
});

type Milestone = z.infer<typeof milestoneSchema>;

const initialMilestones: Milestone[] = [
    { category: 'Achievement', title: "First Steps", date: new Date("2022-06-05"), description: "Harper took her first unassisted steps today!" },
    { category: 'Health', title: "Annual Check-up", date: new Date("2023-08-20"), description: "Everything looks great. Next appointment in one year." },
    { category: 'Growth', title: "Height: 45 inches", date: new Date("2023-08-20"), description: "Grew 2 inches since last year." },
    { category: 'Achievement', title: "Learned to Ride a Bike", date: new Date("2023-09-10"), description: "Rode without training wheels for the first time at the park." },
];

const iconMap: Record<Milestone['category'], React.ElementType> = {
    Achievement: Trophy,
    Health: Stethoscope,
    Growth: Ruler,
};


export default function MilestonesPage() {
    const [milestones, setMilestones] = React.useState<Milestone[]>(initialMilestones.sort((a,b) => b.date.getTime() - a.date.getTime()));
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof milestoneSchema>>({
        resolver: zodResolver(milestoneSchema),
        defaultValues: {
            title: '',
            description: '',
            category: 'Achievement',
            date: new Date(),
        },
    });

    function onSubmit(values: z.infer<typeof milestoneSchema>) {
        setMilestones(prev => [...prev, values].sort((a,b) => b.date.getTime() - a.date.getTime()));
        toast({
            title: "Milestone Added!",
            description: `Successfully added "${values.title}".`,
        });
        form.reset();
        setIsDialogOpen(false);
    }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">Developmental Milestones</h1>
            <p className="text-muted-foreground mt-1">
                A living record of Harper's growth and achievements.
            </p>
         </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
                <PlusCircle />
                <span>Add Milestone</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Milestone</DialogTitle>
              <DialogDescription>
                Record a new achievement or event in Harper's development.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., First Word" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
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
                          <SelectItem value="Achievement">Achievement</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Growth">Growth</SelectItem>
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
                        <Textarea placeholder="Describe the milestone..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Milestone</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone, index) => {
            const IconComponent = iconMap[milestone.category];
            return (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle>{milestone.title}</CardTitle>
                                <CardDescription>{format(milestone.date, 'PPP')}</CardDescription>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                </Card>
            )
        })}
       </div>
    </div>
  );
}
