// src/app/(main)/family-tree/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Family Tree | Harper's Home",
};

const familyMembers = {
    harper: { name: "Harper Ryan", dob: "11/12/2024" },
    parents: [
        { name: "Dad (Craig)", dob: "03/23/1990", side: 'paternal' },
        { name: "Mom (Emma)", dob: "12/15/1995", side: 'maternal' },
    ],
    maternalGrandparents: [
        { name: "Nanny Ryan (Jane)", side: 'maternal' },
        { name: "Grampy Ryan (Sonny)", side: 'maternal' },
    ],
    paternalGrandparents: [
        { name: "Grammy Campbell (Stacey)", side: 'paternal' },
    ],
    maternalAuntsUncles: [
        { name: "Aunt Amber", side: 'maternal' },
        { name: "Aunt Marissa", side: 'maternal' },
        { name: "Uncle Nick", side: 'maternal' },
        { name: "Uncle Matt", side: 'maternal' },
    ],
    paternalAuntsUncles: [
    ],
    maternalCousins: [
        { name: "Cousin Logan", side: 'maternal' },
        { name: "Cousin Wyatt", side: 'maternal' },
    ],
    paternalCousins: [
    ]
};

type FamilyMember = {
    name: string;
    dob?: string;
    side: 'maternal' | 'paternal';
};

const FamilyMemberCard = ({ name, dob }: Omit<FamilyMember, 'side'>) => (
    <div className="flex flex-col items-center text-center p-2 bg-muted/30 rounded-lg">
        <div className="leading-tight">
            <p className="font-semibold">{name}</p>
            {dob && <p className="text-xs text-muted-foreground">{dob}</p>}
        </div>
    </div>
);

const FamilyBranch = ({ title, members, side }: { title: string, members: Omit<FamilyMember, 'side'>[], side: 'maternal' | 'paternal' }) => {
    if (members.length === 0) return null;
    return (
        <div className="space-y-2">
            <h3 className={cn(
                "font-semibold text-center text-sm uppercase tracking-wider pb-1 border-b-2",
                side === 'maternal' ? 'border-accent text-accent-foreground' : 'border-primary text-primary'
            )}>{title}</h3>
            <div className="flex justify-center flex-wrap gap-4 pt-2">
                {members.map(member => <FamilyMemberCard key={member.name} {...member} />)}
            </div>
        </div>
    );
}

export default function FamilyTreePage() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-headline font-extra-bold uppercase tracking-tight">Family Tree</h1>
            <p className="text-muted-foreground mt-1">
                A visual map of Harper's loving family and support system.
            </p>
        </div>

        <div className="space-y-12 flex flex-col items-center">
            {/* Harper */}
             <div className="flex flex-col items-center text-center">
                 <div className="leading-tight p-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg">
                    <p className="font-bold text-xl">{familyMembers.harper.name}</p>
                    <p className="text-sm text-muted-foreground">{familyMembers.harper.dob}</p>
                </div>
            </div>

             {/* Connecting Lines to Parents */}
            <div className="w-full max-w-sm h-12 border-b-2 border-l-2 border-r-2 border-muted rounded-b-lg"></div>

            {/* Parents */}
            <div className="w-full max-w-2xl grid grid-cols-2 gap-8 relative">
                <div className="absolute top-[-3rem] left-1/2 -translate-x-1/2 w-px h-12 bg-muted"></div>
                {familyMembers.parents.map(member => <FamilyMemberCard key={member.name} {...member} />)}
            </div>
            
            {/* Connecting Lines to Grandparents etc. */}
            <div className="w-full max-w-2xl grid grid-cols-2 gap-8">
                <div className="border-t-2 border-muted h-12 w-1/2 mx-auto rounded-t-lg"></div>
                <div className="border-t-2 border-muted h-12 w-1/2 mx-auto rounded-t-lg"></div>
            </div>


            {/* Grandparents & Aunts/Uncles/Cousins */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Dad's Family</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FamilyBranch title="Grandparents" members={familyMembers.paternalGrandparents} side="paternal" />
                        <FamilyBranch title="Aunts & Uncles" members={familyMembers.paternalAuntsUncles} side="paternal" />
                        <FamilyBranch title="Cousins" members={familyMembers.paternalCousins} side="paternal" />
                    </CardContent>
                </Card>

                 <Card className="bg-accent/5 border-accent/20">
                    <CardHeader>
                        <CardTitle className="text-center text-accent-foreground">Mom's Family</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <FamilyBranch title="Grandparents" members={familyMembers.maternalGrandparents} side="maternal" />
                       <FamilyBranch title="Aunts & Uncles" members={familyMembers.maternalAuntsUncles} side="maternal" />
                       <FamilyBranch title="Cousins" members={familyMembers.maternalCousins} side="maternal" />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
