// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import Link from "next/link";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { logIn } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await logIn(values.email, values.password);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGuestMode = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline font-extra-bold tracking-tight">Harper's Home</h1>
            <p className="text-muted-foreground mt-2">Please select your access type to continue.</p>
        </div>
        <div className="space-y-4">
          <Button onClick={() => router.push('/login-form')} size="lg" className="w-full">
            Parent Login
          </Button>
          <Button onClick={handleGuestMode} size="lg" variant="secondary" className="w-full">
            Team & Guest Access
          </Button>
        </div>
      </div>
    </div>
  );
}
