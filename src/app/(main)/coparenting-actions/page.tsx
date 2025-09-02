// src/app/(main)/coparenting-actions/page.tsx
'use client';

import *d from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, Sparkles } from 'lucide-react';
import { coParentingActions, CoParentingActionsOutput } from '@/ai/flows/co-parenting-actions';

export default function CoParentingActionsPage() {
  const [message, setMessage] = d.useState("I was hoping to take Harper on a small trip next month, maybe from the 14th to the 16th. Would you be open to swapping weekends?");
  const [isLoading, setIsLoading] = d.useState(false);
  const [result, setResult] = d.useState<CoParentingActionsOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (message.trim().length < 10) {
      toast({
        variant: 'destructive',
        title: 'Message too short',
        description: 'Please enter a longer message to analyze.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      const output = await coParentingActions({ text: message });
      setResult(output);
    } catch (error) {
      console.error('Error with co-parenting actions:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an error analyzing your message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (tool: string, args: any) => {
    toast({
        title: "Action Triggered!",
        description: `Tool: ${tool} with args: ${JSON.stringify(args)}`
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">CO-PARENTING ACTIONS</h1>
        <p className="text-muted-foreground mt-1">
          Have AI-powered conversations that lead to clear actions and agreements.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Start a Conversation</CardTitle>
            <CardDescription>Describe a situation or request. The AI will analyze it and suggest the next steps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              rows={12}
              placeholder="e.g., I need to switch weekends in May for a family event..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={isLoading || !message} size="lg" className="w-full">
              {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
              <span>Analyze & Propose Actions</span>
            </Button>
          </CardContent>
        </Card>
        <Card className={!result && !isLoading ? 'flex items-center justify-center' : ''}>
          <CardHeader>
            <CardTitle>AI Response & Actions</CardTitle>
            <CardDescription>Review the AI's response and use the suggested actions.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="animate-spin h-8 w-8 mb-2" />
                <p>Analyzing conversation...</p>
              </div>
            )}
            {!result && !isLoading && (
              <div className="text-center text-muted-foreground py-10">
                 <Sparkles className="mx-auto h-12 w-12" />
                <p className="mt-2 font-semibold">AI suggestions will appear here.</p>
                <p className="text-sm">Write a message and click analyze to see AI-suggested actions.</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">AI Generated Response</h3>
                  <div className="p-4 bg-muted rounded-md text-sm leading-relaxed">
                    <p>{result.text}</p>
                  </div>
                </div>
                {result.tool_requests && result.tool_requests.length > 0 && (
                     <div>
                        <h3 className="font-semibold mb-2">Suggested Actions</h3>
                        <div className="flex flex-wrap gap-2">
                            {result.tool_requests.map((tool, index) => (
                                <Button key={index} variant="outline" onClick={() => handleActionClick(tool.name, tool.args)}>
                                    {tool.args.title}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
