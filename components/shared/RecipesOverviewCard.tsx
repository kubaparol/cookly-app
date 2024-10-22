'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { cn } from '@/utils';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', value: 222 },
  { date: '2024-04-02', value: 97 },
  { date: '2024-04-03', value: 167 },
  { date: '2024-04-04', value: 242 },
  { date: '2024-04-05', value: 373 },
  { date: '2024-04-06', value: 301 },
  { date: '2024-04-07', value: 245 },
  { date: '2024-04-08', value: 409 },
  { date: '2024-04-09', value: 59 },
  { date: '2024-04-10', value: 261 },
  { date: '2024-04-11', value: 327 },
  { date: '2024-04-12', value: 292 },
  { date: '2024-04-13', value: 342 },
  { date: '2024-04-14', value: 137 },
  { date: '2024-04-15', value: 120 },
  { date: '2024-04-16', value: 138 },
  { date: '2024-04-17', value: 446 },
  { date: '2024-04-18', value: 364 },
  { date: '2024-04-19', value: 243 },
  { date: '2024-04-20', value: 89 },
  { date: '2024-04-21', value: 137 },
  { date: '2024-04-22', value: 224 },
  { date: '2024-04-23', value: 138 },
  { date: '2024-04-24', value: 387 },
  { date: '2024-04-25', value: 215 },
  { date: '2024-04-26', value: 75 },
  { date: '2024-04-27', value: 383 },
  { date: '2024-04-28', value: 122 },
  { date: '2024-04-29', value: 315 },
  { date: '2024-05-09', value: 227 },
  { date: '2024-05-10', value: 293 },
  { date: '2024-05-11', value: 335 },
  { date: '2024-05-12', value: 197 },
  { date: '2024-05-13', value: 197 },
  { date: '2024-05-14', value: 448 },
  { date: '2024-05-15', value: 473 },
  { date: '2024-05-16', value: 338 },
  { date: '2024-05-17', value: 499 },
  { date: '2024-05-18', value: 315 },
  { date: '2024-05-19', value: 235 },
];

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  value: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export interface RecipesOverviewCardProps extends React.ComponentPropsWithoutRef<'div'> {}

export function RecipesOverviewCard(props: RecipesOverviewCardProps) {
  const { className, ...rest } = props;

  return (
    <Card {...rest} className={cn('', className)}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>

      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey="value" fill="hsl(var(--chart-1))" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
