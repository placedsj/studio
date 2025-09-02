// src/app/(main)/schedule-optimizer/page.tsx
import { AiScheduleOptimizer } from '@/components/ai-schedule-optimizer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Schedule Optimizer | Harper's Home",
};

export default function ScheduleOptimizerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">AI Schedule Optimizer</h1>
        <p className="text-muted-foreground mt-1">
          Explore potential custody arrangements that prioritize everyone's needs.
        </p>
      </div>
      <AiScheduleOptimizer />
    </div>
  );
}
