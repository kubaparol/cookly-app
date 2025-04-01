'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, desc, eq, sql } from 'drizzle-orm';

import { createRecipeSqlFilters, handleError } from '@/utils';

import { DATA_PER_PAGE } from '@/constants';

import { db } from '@/db/drizzle';
import { comments, favorites, recipes, views } from '@/db/schema';

import { GetMyRecipesParams } from './types';

export async function getMyRecipes(params: GetMyRecipesParams) {
  const { limit, offset, ...rest } = params;

  const filters = createRecipeSqlFilters(rest);

  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    const countResult = await db.query.recipes.findMany({
      where: and(...filters, ...[eq(recipes.authorId, user.id)]),
      columns: {
        id: true,
      },
    });

    const totalCount = countResult.length;

    const recipesResult = await db
      .select({
        id: recipes.id,
        title: recipes.title,
        imageUrl: recipes.imageUrl,
        averageRating: recipes.averageRating,
        status: recipes.status,
        updatedAt: recipes.updatedAt,
        favoritesCount: sql<number>`cast(count(distinct ${favorites.userId}) as int)`.as(
          'favoritesCount',
        ),
        commentsCount: sql<number>`cast(count(distinct ${comments.id}) as int)`.as('commentsCount'),
        viewsCount: sql<number>`cast(count(distinct ${views.id}) as int)`.as('viewsCount'),
      })
      .from(recipes)
      .leftJoin(favorites, eq(favorites.recipeId, recipes.id))
      .leftJoin(comments, eq(comments.recipeId, recipes.id))
      .leftJoin(views, eq(views.recipeId, recipes.id))
      .where(and(...filters, eq(recipes.authorId, user.id)))
      .groupBy(recipes.id)
      .limit(limit || DATA_PER_PAGE)
      .offset(offset || 0)
      .orderBy(desc(recipes.createdAt));

    return {
      count: totalCount,
      data: recipesResult,
    };
  } catch (error) {
    handleError(error);
  }
}
