// src/app/(main)/fund/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import { Progress } from '@/components/ui/progress';

export const metadata: Metadata = {
  title: "Shared Fund | Harper's Home",
};

export default function FundPage() {
    const transactions = [
        { date: "2025-08-01", description: "Mom's Contribution", category: "Contribution", amount: 250.00 },
        { date: "2025-08-02", description: "Fall Soccer League Fees", category: "Activities", amount: -75.00 },
        { date: "2025-08-05", description: "Dad's Contribution", category: "Contribution", amount: 250.00 },
        { date: "2025-08-10", description: "Winter Coat", category: "Clothing", amount: -55.50 },
        { date: "2025-08-15", description: "Doctor's Visit Co-pay", category: "Medical", amount: -30.00 },
    ];

    const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
    const totalContributions = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const totalSpending = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0) * -1;
    
    const spendingByCategory = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => {
            if (!acc[t.category]) {
                acc[t.category] = 0;
            }
            acc[t.category] += t.amount * -1;
            return acc;
        }, {} as Record<string, number>);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-extra-bold uppercase tracking-tight">Shared Fund Management</h1>
        <p className="text-muted-foreground mt-1">
          A transparent record of shared expenses for Harper.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Current Balance</CardTitle>
                <CardDescription>The total amount available in the shared fund.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">Total contributions this period: ${totalContributions.toFixed(2)}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>A summary of spending by category.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.entries(spendingByCategory).map(([category, amount]) => (
                    <div key={category}>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{category}</span>
                            <span className="text-sm text-muted-foreground">${amount.toFixed(2)}</span>
                        </div>
                        <Progress value={(amount / totalSpending) * 100} aria-label={`${category} expenses`} />
                    </div>
                ))}
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
                            <TableCell>{t.date}</TableCell>
                            <TableCell>{t.description}</TableCell>
                            <TableCell>
                                <Badge 
                                    variant={t.amount > 0 ? "default" : "secondary"} 
                                    className={t.amount > 0 ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200" : ""}
                                >
                                    {t.category}
                                </Badge>
                            </TableCell>
                            <TableCell className={`text-right font-medium ${t.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
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
