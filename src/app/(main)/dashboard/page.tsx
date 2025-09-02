import { AiScheduleOptimizer } from '@/components/ai-schedule-optimizer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | FamilyVerse',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">AI Schedule Optimizer</h1>
        <p className="text-muted-foreground mt-2">
          Let our AI help you find the best custody schedule that prioritizes your child's well-being.
        </p>
      </div>
      <AiScheduleOptimizer />
    </div>
  );
}
