import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StatisticCardProps {
  title: string;
  value: number;
}

export default function StatisticCard({ title, value }: StatisticCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
