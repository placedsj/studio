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
        { date: "2023-11-01", description: "Parent A Contribution", category: "Contribution", amount: 250.00 },
        { date: "2023-11-02", description: "Fall Soccer League Fees", category: "Activities", amount: -75.00 },
        { date: "2023-11-05", description: "Parent B Contribution", category: "Contribution", amount: 250.00 },
        { date: "2023-11-10", description: "Winter Coat", category: "Clothing", amount: -55.50 },
        { date: "2023-11-15", description: "Doctor's Visit Co-pay", category: "Medical", amount: -30.00 },
    ];

    const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
    const totalContributions = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">Shared Fund Management</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">Total contributions this period: ${totalContributions.toFixed(2)}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Activities</span>
                        <span className="text-sm text-muted-foreground">40%</span>
                    </div>
                    <Progress value={40} aria-label="40% of expenses on Activities" />
                 </div>
                 <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Clothing</span>
                        <span className="text-sm text-muted-foreground">30%</span>
                    </div>
                    <Progress value={30} aria-label="30% of expenses on Clothing" />
                 </div>
                 <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Medical</span>
                        <span className="text-sm text-muted-foreground">30%</span>
                    </div>
                    <Progress value={30} aria-label="30% of expenses on Medical" />
                 </div>
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
                            <TableCell><Badge variant={t.amount > 0 ? "default" : "secondary"} className={t.amount > 0 ? "bg-accent text-accent-foreground" : ""}>{t.category}</Badge></TableCell>
                            <TableCell className={`text-right font-medium ${t.amount > 0 ? 'text-foreground' : 'text-destructive'}`}>
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
