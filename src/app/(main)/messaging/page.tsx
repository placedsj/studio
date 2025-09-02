// src/app/(main)/messaging/page.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
    id: number;
    user: 'Mom' | 'Dad';
    avatar: string;
    initials: string;
    text: string;
    timestamp: string;
};

const initialMessages: Message[] = [
    {
        id: 1,
        user: 'Dad',
        avatar: '',
        initials: 'D',
        text: "Hey, just wanted to confirm you're picking up Harper from school today?",
        timestamp: "10:30 AM"
    },
    {
        id: 2,
        user: 'Mom',
        avatar: '',
        initials: 'M',
        text: "Yes, I'll be there to pick her up. She has her soccer practice afterwards, so I'll take her to that as well.",
        timestamp: "10:32 AM"
    },
    {
        id: 3,
        user: 'Dad',
        avatar: '',
        initials: 'D',
        text: "Okay, sounds good. I was going to ask about the weekend. Are we still on for me to have her Saturday morning?",
        timestamp: "10:33 AM"
    },
    {
        id: 4,
        user: 'Mom',
        avatar: '',
        initials: 'M',
        text: "Actually, something's come up. I need to switch weekends. I can take her next weekend instead.",
        timestamp: "10:35 AM"
    }
];


export default function MessagingPage() {
    const [messages, setMessages] = React.useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = React.useState('');
    const { toast } = useToast();
    
    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const newMsg: Message = {
            id: messages.length + 1,
            user: 'Dad', // Assuming 'Dad' is the current user for demo
            avatar: '',
            initials: 'D',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
    };

    const handleAnalyze = () => {
        if (newMessage.trim().length < 5) {
            toast({
                variant: 'destructive',
                title: 'Message too short',
                description: 'Please enter a longer message to analyze.',
            });
            return;
        }
        toast({
            title: "AI Analysis",
            description: "In a real app, this would show AI suggestions for your draft."
        });
    }

    const currentUser = 'Dad'; // For styling purposes

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">MESSAGING</h1>
            <p className="text-muted-foreground mt-1">
                A secure and recorded communication channel with a built-in mediator.
            </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Conversation with Mom</CardTitle>
                <CardDescription>All messages are timestamped and cannot be deleted.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-[65vh]">
                <div className="flex-grow space-y-6 overflow-y-auto p-4 border rounded-md bg-muted/20">
                    {messages.map(msg => (
                        <div key={msg.id} className={cn(
                            "flex items-end gap-3",
                            msg.user === currentUser ? "justify-end" : "justify-start"
                        )}>
                             {msg.user !== currentUser && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{msg.initials}</AvatarFallback>
                                </Avatar>
                             )}
                             <div className={cn(
                                "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg",
                                msg.user === currentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                             )}>
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs mt-1 text-right opacity-70">{msg.timestamp}</p>
                             </div>
                             {msg.user === currentUser && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{msg.initials}</AvatarFallback>
                                </Avatar>
                             )}
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <Input 
                        placeholder="Type your message..."
                        className="flex-grow"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button variant="outline" size="icon" onClick={handleAnalyze} aria-label="Analyze Message with AI">
                        <Wand2 />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage} aria-label="Send Message">
                        <Send />
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
