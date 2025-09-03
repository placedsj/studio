// src/app/(main)/ai-tools/schedule-optimizer/page.tsx
import { AiScheduleOptimizer } from '@/components/ai-schedule-optimizer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Schedule Optimizer | Harper's Home",
};

export default function ScheduleOptimizerPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">AI Schedule Optimizer</h1>
        <p className="text-muted-foreground mt-1">
            Let AI help you find a balanced and child-focused custody schedule.
        </p>
       </div>
       <AiScheduleOptimizer />
    </div>
  );
}
