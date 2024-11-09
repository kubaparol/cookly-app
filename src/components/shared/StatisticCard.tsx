import { LucideProps } from 'lucide-react';
import { ComponentPropsWithoutRef, ComponentType } from 'react';

import { cn } from '@/utils';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface StatisticCardProps extends ComponentPropsWithoutRef<'div'> {
  icon: ComponentType<LucideProps>;
  title: string;
  value: string | number;
  disabled?: boolean;
}

export default function StatisticCard(props: StatisticCardProps) {
  const { icon: Icon, title, value, disabled, className, ...rest } = props;

  return (
    <Card {...rest} className={cn('', disabled && 'opacity-45', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-5 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
