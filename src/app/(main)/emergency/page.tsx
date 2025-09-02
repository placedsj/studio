import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, User, Stethoscope, ShieldAlert } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "Emergency | Harper's Home",
};

export default function EmergencyPage() {
    const medicalContacts = [
        { name: "Dr. Emily Carter", role: "Pediatrician", phone: "555-0101" },
        { name: "Children's Hospital", role: "Nearest Hospital", phone: "555-0102" },
        { name: "Poison Control", role: "24/7 Hotline", phone: "1-800-222-1222" },
    ];

    const emergencyContacts = [
        { name: "Emma Ryan", relation: "Parent", phone: "555-0103" },
        { name: "Craig Schulz", relation: "Parent", phone: "555-0104" },
        { name: "Nanny Ryan (Jane)", relation: "Grandmother", phone: "555-0105" },
    ];

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Emergency Information</h1>
        <p className="text-muted-foreground mt-1">
            Quick access to critical contacts and information.
        </p>
       </div>
       <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Stethoscope />
                        <span>Medical Contacts</span>
                    </CardTitle>
                    <CardDescription>Key healthcare providers for Harper.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {medicalContacts.map((contact, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{contact.name}</p>
                                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={`tel:${contact.phone}`}>
                                        <Phone />
                                        <span>Call</span>
                                    </a>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User />
                        <span>Emergency Contacts</span>
                    </CardTitle>
                    <CardDescription>Family and caregivers to contact in an emergency.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-4">
                        {emergencyContacts.map((contact, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{contact.name}</p>
                                    <p className="text-sm text-muted-foreground">{contact.relation}</p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={`tel:${contact.phone}`}>
                                        <Phone />
                                        <span>Call</span>
                                    </a>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
