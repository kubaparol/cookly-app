import Link from 'next/link';

import { cn } from '@/utils';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickActionCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  href: string;
  className?: string;
}

export function QuickActionCard({
  title,
  icon,
  description,
  href,
  className,
}: QuickActionCardProps) {
  return (
    <Link href={href} className={cn('block', className)}>
      <Card className="h-full transition-all hover:bg-muted/30 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{title}</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
          </div>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
