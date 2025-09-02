import { Card, CardContent } from '@/components/ui/card';
import { FileText, FileBadge, FileHeart, Upload } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Documents | FamilyVerse',
};

export default function DocumentsPage() {
    const documents = [
        { icon: FileHeart, name: "Harper's Birth Certificate.pdf", category: "Legal", size: "1.2 MB" },
        { icon: FileBadge, name: "2023 School Report Card.pdf", category: "School", size: "800 KB" },
        { icon: FileHeart, name: "Immunization Records.pdf", category: "Medical", size: "2.5 MB" },
        { icon: FileText, name: "Custody Agreement.docx", category: "Legal", size: "450 KB" },
    ];

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-headline tracking-tight">Secure Documents</h1>
            <Button>
                <Upload />
                <span>Upload Document</span>
            </Button>
       </div>
       <Card>
        <CardContent className="p-0">
            <ul className="divide-y">
                {documents.map((doc, index) => (
                    <li key={index} className="flex items-center justify-between p-4 hover:bg-accent/50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <doc.icon className="w-8 h-8 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{doc.name}</p>
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
