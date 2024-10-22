'use server';

import { currentUser } from '@clerk/nextjs/server';
import dayjs from 'dayjs';
import { SQL, and, asc, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { recipes } from '@/db/schema';

import { RecipesOverviewChartData } from '@/components/shared/RecipesOverviewCard';

export async function getRecipesOverview() {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const filters: SQL[] = [eq(recipes.authorId, user.id)];

    const founds = await db
      .select({ createdAt: recipes.createdAt })
      .from(recipes)
      .where(and(...filters))
      .orderBy(asc(recipes.createdAt));

    const grouped: RecipesOverviewChartData = [];

    for (const found of founds) {
      const date = dayjs(found.createdAt).format('YYYY-MM-DD');
      const index = grouped.findIndex((group) => group.date === date);

      if (index === -1) {
        grouped.push({ date, value: 1 });
      } else {
        grouped[index].value = grouped[index].value + 1;
      }
    }

    return grouped;
  } catch (error) {
    handleError(error);
  }
}
