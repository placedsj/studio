
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Our Mission</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Transforming crisis into stability for parents and their children.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>The Elevator Pitch</CardTitle>
        </CardHeader>
        <CardContent className="text-lg">
          <p>
            Harper&apos;s Place provides essential structure and strategy for
            parents navigating high-conflict separation. We are a resource hub
            dedicated to transforming crisis into stability by providing tools
            for verifiable, court-admissible documentation, personal
            accountability, and child-centered planning. We help parents
            stabilize their own lives so they can secure their child’s future.{" "}
            <strong>Our only interest is your child&apos;s best interest.</strong>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Founder&apos;s Commitment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg">
          <h3 className="font-semibold">Why Harper&apos;s Place?</h3>
          <p>
            This organization was founded on the belief that a child&apos;s right
            to safety and stability must be non-negotiable. Our namesake,
            Harper, represents every child caught in the unpredictable chaos of
            family breakdown. We exist to provide the resources and backbone
            necessary for every parent to successfully build a secure and
            thriving &quot;place&quot; for their child, just as we have done.
          </p>
          <p className="font-semibold">
            Our mission is personal, our standards are professional, and{" "}
            <strong>our only interest is your child&apos;s best interest.</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
