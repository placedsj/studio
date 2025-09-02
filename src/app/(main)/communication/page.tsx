
// src/app/(main)/communication/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { improveCommunication, ImproveCommunicationOutput } from '@/ai/flows/improve-communication';

export default function CommunicationPage() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImproveCommunicationOutput | null>(null);
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
      const output = await improveCommunication({ message });
      setResult(output);
    } catch (error) {
      console.error('Error improving communication:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an error analyzing your message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Communication Center</h1>
        <p className="text-muted-foreground mt-1">
          Craft clear, positive, and child-focused messages with AI assistance.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>Write your message below and let the AI help you refine it.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              rows={10}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
              <span>Analyze & Suggest</span>
            </Button>
          </CardContent>
        </Card>
        <Card className={!result && !isLoading ? 'flex items-center justify-center' : ''}>
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>Review the AI's feedback to improve your communication.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin" />
                <span>Analyzing...</span>
              </div>
            )}
            {!result && !isLoading && (
              <div className="text-center text-muted-foreground">
                <p>Your suggestions will appear here.</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Revised Message</h3>
                  <div className="p-4 bg-muted rounded-md text-sm">
                    <p>{result.revisedMessage}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Key Changes & Reasoning</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {result.keyChanges.map((change, index) => (
                      <li key={index}>{change}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
