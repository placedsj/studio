
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlueprintPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">The Stability Blueprint</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          When a family separates, the court’s primary concern is stability. Harper’s Place provides the structure needed to meet and exceed this standard. Our model focuses on three pillars of verifiable strength:
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pillar 1: Accountability and Fitness</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            We guide parents in proactively addressing personal challenges to secure a safe environment for their children.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold">Action:</h4>
              <p>Documented commitment to self-improvement (e.g., recovery, therapy, mental health work).</p>
            </div>
            <div>
              <h4 className="font-semibold">Result:</h4>
              <p>Objective, third-party letters and documentation that affirm the parent&apos;s fitness and dedication to long-term stability.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pillar 2: Unalterable Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            We equip parents with tools to shift their case from &quot;he said/she said&quot; conflict to verifiable fact.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold">Action:</h4>
              <p>Implementation of a chronological, cloud-based evidence log (The Harper&apos;s Place Evidence Log) for all communication and incidents.</p>
            </div>
            <div>
              <h4 className="font-semibold">Result:</h4>
              <p>A court-ready index of events, demonstrating non-compliance, lack of communication, or risk from the opposing party, backed by timestamped, tamper-proof records.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pillar 3: Child-Centric Advocacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            We shift the focus from the parents&apos; dispute to the child’s thriving life.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold">Action:</h4>
              <p>Developing a comprehensive, child-specific parenting plan that details routines, educational support, medical care, and consistent engagement.</p>
            </div>
            <div>
              <h4 className="font-semibold">Result:</h4>
              <p>A compelling case that proves the caregiver is the primary source of safety, consistency, and developmental opportunity, meeting the highest standard of &quot;best interest of the child.&quot;</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
