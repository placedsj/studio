// src/app/(main)/document-analyzer/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, FilePlus, FileText } from 'lucide-react';
import { processEvidenceText, ProcessEvidenceTextOutput } from '@/ai/flows/process-evidence-text';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function DocumentAnalyzerPage() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProcessEvidenceTextOutput | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleAnalyze = async () => {
    if (text.trim().length < 20) {
      toast({
        variant: 'destructive',
        title: 'Text is too short',
        description: 'Please paste more content to analyze effectively.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const output = await processEvidenceText({ textContent: text });
      setResult(output);
    } catch (error) {
      console.error('Error processing evidence text:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an error analyzing the text. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddToLog = () => {
    if (!result) return;
    toast({
        title: "Added to Evidence Log",
        description: `"${result.suggestedTitle}" has been prepared for the log.`
    });
    router.push('/evidence-log');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">Document Analyzer</h1>
        <p className="text-muted-foreground mt-1">
          Paste text from emails, PDFs, or other documents to automatically extract key info and categorize it.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Paste Document Text</CardTitle>
            <CardDescription>Copy the text from your source and paste it below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message-2">Your Text</Label>
              <Textarea 
                placeholder="Paste your text content here..." 
                id="message-2" 
                rows={15}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                The AI will analyze this text to suggest a title, category, and summary.
              </p>
            </div>
            <Button onClick={handleAnalyze} disabled={isLoading || !text} className="w-full">
              {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
              <span>Analyze Text</span>
            </Button>
          </CardContent>
        </Card>

        <Card className={!result && !isLoading ? 'flex items-center justify-center' : ''}>
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
            <CardDescription>Review the AI's analysis before adding to your log.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin" />
                <span>Analyzing text...</span>
              </div>
            )}
            {!result && !isLoading && (
              <div className="text-center text-muted-foreground py-10">
                <FileText className="mx-auto h-12 w-12" />
                <p>Your analysis will appear here.</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">Suggested Title</h3>
                    <p className="p-3 bg-muted rounded-md text-sm">{result.suggestedTitle}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Suggested Category</h3>
                    <p className="p-3 bg-muted rounded-md text-sm">{result.suggestedCategory}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Summary</h3>
                  <p className="p-3 bg-muted rounded-md text-sm">{result.summary}</p>
                </div>
                <Button onClick={handleAddToLog} className="w-full">
                    <FilePlus />
                    <span>Add to Evidence Log</span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
