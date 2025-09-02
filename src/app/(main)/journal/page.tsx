// src/app/(main)/journal/page.tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, CalendarIcon, ImageUp } from 'lucide-react';
import Image from 'next/image';
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

const entrySchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  date: z.date(),
  content: z.string().min(1, 'Content is required.'),
  image: z.string().url('Please provide a valid image URL.').optional().or(z.literal('')),
  dataAiHint: z.string().optional(),
});

type JournalEntry = z.infer<typeof entrySchema>;

const initialEntries: JournalEntry[] = [
    {
      title: "Harper's First Soccer Goal!",
      date: new Date("2023-10-26"),
      content: "So proud of Harper today! She scored her very first goal in the game against the Blue Jays. Her face lit up with so much joy. It was a beautiful moment.",
      image: "https://picsum.photos/400/200",
      dataAiHint: "soccer goal"
    },
    {
      title: "Visit to the Science Museum",
      date: new Date("2023-10-15"),
      content: "We had a fantastic day exploring the science museum. Harper was fascinated by the dinosaur exhibit and the planetarium show. A day full of curiosity and learning.",
      image: "https://picsum.photos/400/201",
      dataAiHint: "science museum"
    }
];

export default function JournalPage() {
    const [entries, setEntries] = React.useState<JournalEntry[]>(initialEntries);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof entrySchema>>({
        resolver: zodResolver(entrySchema),
        defaultValues: {
            title: '',
            content: '',
            date: new Date(),
            image: '',
            dataAiHint: '',
        },
    });

    function onSubmit(values: z.infer<typeof entrySchema>) {
        const newEntry = {
          ...values,
          image: values.image || `https://picsum.photos/400/20${entries.length + 2}` // Placeholder image
        };
        setEntries(prev => [newEntry, ...prev].sort((a,b) => b.date.getTime() - a.date.getTime()));
        toast({
            title: "Journal Entry Added!",
            description: `Successfully added "${values.title}".`,
        });
        form.reset();
        setIsDialogOpen(false);
    }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Family Journal</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
                <PlusCircle />
                <span>New Entry</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Journal Entry</DialogTitle>
              <DialogDescription>
                Share a new memory or moment with the family.
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
                        <Input placeholder="e.g., A day at the park" {...field} />
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
                <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                            <ImageUp className="text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                           <Button type="button" variant="outline">Upload Image</Button>
                           <p className="text-xs text-muted-foreground">For now, a placeholder image will be used.</p>
                        </div>
                    </div>
                </FormItem>
                 <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the memory..." {...field} />
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
       <div className="grid gap-6 md:grid-cols-2">
        {entries.map((entry, index) => (
          <Card key={index} className="overflow-hidden">
             <Image src={entry.image || 'https://picsum.photos/400/200'} data-ai-hint={entry.dataAiHint} alt={entry.title} width={400} height={200} className="object-cover w-full aspect-video" />
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
              <CardDescription>{format(entry.date, 'PPP')}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{entry.content}</p>
            </CardContent>
          </Card>
        ))}
       </div>
    </div>
  );
}
