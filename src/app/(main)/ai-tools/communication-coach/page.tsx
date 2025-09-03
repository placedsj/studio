// src/app/(main)/ai-tools/communication-coach/page.tsx
import { AiCommunicationCoach } from '@/components/ai-communication-coach';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Communication Coach | Harper's Home",
};

export default function CommunicationCoachPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">AI Communication Coach</h1>
        <p className="text-muted-foreground mt-1">
            Refine your messages to be clearer, more positive, and child-focused.
        </p>
       </div>
       <AiCommunicationCoach />
    </div>
  );
}
