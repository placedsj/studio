// src/app/(main)/documents/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FileBadge, FileHeart, Upload, FileSignature } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "Documents | Harper's Home",
};

const documents = [
    { icon: FileHeart, name: "Harper's Birth Certificate.pdf", category: "Medical & Identity", size: "1.2 MB" },
    { icon: FileSignature, name: "Custody Agreement.pdf", category: "Legal", size: "450 KB" },
    { icon: FileBadge, name: "2023 School Report Card.pdf", category: "School Records", size: "800 KB" },
    { icon: FileHeart, name: "Immunization Records.pdf", category: "Medical & Identity", size: "2.5 MB" },
    { icon: FileText, name: "Parenting Plan Outline.docx", category: "Legal", size: "35 KB" },
];


export default function DocumentsPage() {
  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Secure Documents</h1>
            <p className="text-muted-foreground mt-1">
                A central, secure place for all of Harper's important files.
            </p>
        </div>
        <Button>
            <Upload />
            <span>Upload Document</span>
        </Button>
       </div>
       <Card>
        <CardHeader>
            <CardTitle>All Documents</CardTitle>
            <CardDescription>Browse and manage all shared documents.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="divide-y">
                {documents.map((doc, index) => (
                    <li key={index} className="flex items-center justify-between p-4 hover:bg-accent/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <doc.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold">{doc.name}</p>
                                <p className="text-sm text-muted-foreground">{doc.category}</p>
                            </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{doc.size}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
       </Card>
    </div>
  );
}
