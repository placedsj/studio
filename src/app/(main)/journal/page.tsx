import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "Journal | Harper's Home",
};

export default function JournalPage() {
  const entries = [
    {
      title: "Harper's First Soccer Goal!",
      date: "October 26, 2023",
      content: "So proud of Harper today! She scored her very first goal in the game against the Blue Jays. Her face lit up with so much joy. It was a beautiful moment.",
      image: "https://picsum.photos/400/200",
      dataAiHint: "soccer goal"
    },
    {
      title: "Visit to the Science Museum",
      date: "October 15, 2023",
      content: "We had a fantastic day exploring the science museum. Harper was fascinated by the dinosaur exhibit and the planetarium show. A day full of curiosity and learning.",
      image: "https://picsum.photos/400/201",
      dataAiHint: "science museum"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Family Journal</h1>
        <Button>
            <PlusCircle />
            <span>New Entry</span>
        </Button>
      </div>
       <div className="grid gap-6 md:grid-cols-2">
        {entries.map((entry, index) => (
          <Card key={index} className="overflow-hidden">
             <Image src={entry.image} data-ai-hint={entry.dataAiHint} alt={entry.title} width={400} height={200} className="object-cover w-full aspect-video" />
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
              <CardDescription>{entry.date}</CardDescription>
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
