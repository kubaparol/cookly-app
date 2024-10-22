'use client';

import dayjs from 'dayjs';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ProjectUrls } from '@/constants';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const chartConfig = {
  recipes: {
    label: 'Created Recipes',
  },
} satisfies ChartConfig;

export type RecipesOverviewChartData = {
  date: string;
  value: number;
}[];

interface RecipesOverviewCardProps {
  data: RecipesOverviewChartData;
}

export function RecipesOverviewCard(props: RecipesOverviewCardProps) {
  const { data } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>

      <CardContent className="pl-2">
        {data.length === 0 ? (
          <div className="grid aspect-auto h-[350px] w-full place-items-center">
            <div className="grid gap-3">
              <p className="mt-4 text-center text-sm text-gray-500">
                You haven't created any recipes yet.
              </p>

              <Button asChild size="sm" className="mx-auto w-fit">
                <Link href={ProjectUrls.createRecipe} className="gap-2">
                  Create your first recipe
                  <PlusIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
            <BarChart
              accessibilityLayer
              data={data}
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
                tickFormatter={(value) => dayjs(value).format('MMM DD')}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="recipes"
                    labelFormatter={(value) => dayjs(value).format('MMM DD, YYYY')}
                  />
                }
              />
              <Bar dataKey="value" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
