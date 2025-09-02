// src/app/(main)/family-tree/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Family Tree | Harper's Home",
};

const familyMembers = {
    harper: { name: "Harper Ryan", dob: "11/12/2024", initials: "HR" },
    parents: [
        { name: "Dad (Craig)", dob: "03/23/1990", initials: "D" },
        { name: "Mom (Emma)", dob: "12/15/1995", initials: "M" },
    ],
    maternalGrandparents: [
        { name: "Nanny Ryan (Jane)", initials: "JR" },
        { name: "Grampy Ryan (Sonny)", initials: "SR" },
    ],
    paternalGrandparents: [
        { name: "Grammy Campbell (Stacey)", initials: "SC" },
    ],
    maternalAuntsUncles: [
        { name: "Aunt Amber", initials: "AA" },
        { name: "Aunt Marissa", initials: "AM" },
    ],
    paternalAuntsUncles: [
        { name: "Uncle Nick", initials: "UN" },
        { name: "Uncle Matt", initials: "UM" },
    ],
    maternalCousins: [
        { name: "Cousin Logan", initials: "CL" },
    ],
    paternalCousins: [
        { name: "Cousin Wyatt", initials: "CW" },
    ]
};

const FamilyMemberCard = ({ name, dob, initials }: { name: string, dob?: string, initials: string }) => (
    <div className="flex flex-col items-center text-center">
        <Avatar className="w-16 h-16 mb-2">
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{name}</p>
        {dob && <p className="text-xs text-muted-foreground">{dob}</p>}
    </div>
);

export default function FamilyTreePage() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline uppercase tracking-tight">Family Tree</h1>
            <p className="text-muted-foreground mt-1">
                A visual map of Harper's loving family and support system.
            </p>
        </div>

        <div className="space-y-12 flex flex-col items-center">
            {/* Harper */}
            <Card className="max-w-xs">
                <CardHeader className="items-center">
                    <Heart className="w-8 h-8 text-primary" />
                    <CardTitle>{familyMembers.harper.name}</CardTitle>
                    <CardDescription>{familyMembers.harper.dob}</CardDescription>
                </CardHeader>
            </Card>

            {/* Parents */}
            <div className="w-full max-w-2xl">
                 <h2 className="text-lg font-semibold text-center mb-4">Parents</h2>
                 <div className="flex justify-center gap-8">
                    {familyMembers.parents.map(member => <FamilyMemberCard key={member.name} {...member} />)}
                </div>
            </div>

            {/* Grandparents & Aunts/Uncles/Cousins */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Mom's Family</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-3">Grandparents</h3>
                            <div className="flex gap-4">
                                {familyMembers.maternalGrandparents.map(member => <FamilyMemberCard key={member.name} {...member} />)}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Aunts</h3>
                            <div className="flex gap-4">
                                {familyMembers.maternalAuntsUncles.map(member => <FamilyMemberCard key={member.name} {...member} />)}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Cousins</h3>
                             <div className="flex gap-4">
                                {familyMembers.maternalCousins.map(member => <FamilyMemberCard key={member.name} {...member} />)}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Dad's Family</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-3">Grandparents</h3>
                            <div className="flex gap-4">
                                {familyMembers.paternalGrandparents.map(member => <FamilyMemberCard key={member.name} {...member} />)}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Uncles</h3>
                            <div className="flex gap-4">
                                {familyMembers.paternalAuntsUncles.map(member => <FamilyMemberCard key={member.name} {...member} />)}
                            </div>
                        </div>
                         <div>
                            <h3 className="font-semibold mb-3">Cousins</h3>
                             <div className="flex gap-4">
                                {familyMembers.paternalCousins.map(member => <FamilyMemberCard key={member.name} {...member} />)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
