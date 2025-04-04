'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EngagementCardProps {
  title: string;
  count: number;
  trend: string;
  icon: React.ReactNode;
  description: string;
}

export function EngagementCard({ title, count, trend, icon, description }: EngagementCardProps) {
  const isPositive = trend.startsWith('+');

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            {icon}
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{count.toLocaleString()}</div>
        <div className="mt-2 flex items-center">
          {isPositive ? (
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </span>
          <span className="ml-1 text-xs text-muted-foreground">vs. previous period</span>
        </div>
      </CardContent>
    </Card>
  );
}
