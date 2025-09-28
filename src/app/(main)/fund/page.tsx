// src/app/(main)/fund/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// This is a placeholder for the actual page metadata
// export const metadata: Metadata = {
//   title: "Shared Fund | Harper's Home",
// };

const transactions = [
    { date: "2025-08-01", description: "Mom's Contribution", category: "Contribution", amount: 250.00 },
    { date: "2025-08-02", description: "Fall Soccer League Fees", category: "Activities", amount: -75.00 },
    { date: "2025-08-05", description: "Dad's Contribution", category: "Contribution", amount: 250.00 },
    { date: "2025-08-10", description: "Winter Coat", category: "Clothing", amount: -55.50 },
    { date: "2025-08-15", description: "Doctor's Visit Co-pay", category: "Medical", amount: -30.00 },
    { date: "2025-08-18", description: "School Supplies", category: "Education", amount: -45.00 },
    { date: "2025-08-22", description: "Birthday Gift for Friend", category: "Gifts", amount: -20.00 },

];

const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
const totalContributions = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);

const spendingByCategory = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
        if (!acc[t.category]) {
            acc[t.category] = 0;
        }
        acc[t.category] += t.amount * -1;
        return acc;
    }, {} as Record<string, number>);
    
const spendingData = Object.entries(spendingByCategory).map(([name, value]) => ({ name, value }));

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];


export default function FundPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-extra-bold uppercase tracking-tight">Shared Fund Management</h1>
        <p className="text-muted-foreground mt-1">
          A transparent record of shared expenses for Harper.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
            <CardHeader>
                <CardTitle>Current Balance</CardTitle>
                <CardDescription>The total amount available in the shared fund.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-5xl font-bold text-primary">${balance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">Total contributions: ${totalContributions.toFixed(2)}</p>
            </CardContent>
        </Card>
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>A summary of spending by category.</CardDescription>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={spendingData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                        >
                            {spendingData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                          }}
                        />
                        <Legend iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A clear financial record of contributions and expenditures.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((t, i) => (
                        <TableRow key={i}>
                            <TableCell className="text-muted-foreground">{t.date}</TableCell>
                            <TableCell className="font-medium">{t.description}</TableCell>
                            <TableCell>
                                <Badge 
                                    variant={t.amount > 0 ? "default" : "secondary"} 
                                    className={t.amount > 0 ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300" : ""}
                                >
                                    {t.category}
                                </Badge>
                            </TableCell>
                            <TableCell className={`text-right font-semibold ${t.amount > 0 ? 'text-green-500 dark:text-green-400' : ''}`}>
                                {t.amount > 0 ? '+' : ''}${t.amount.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
