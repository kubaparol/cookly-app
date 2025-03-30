import { SQL, eq, ilike, inArray, sql } from 'drizzle-orm';

import { GetRecipesParams, recipes } from '@/db';

export const createRecipeSqlFilters = (params: GetRecipesParams): SQL[] => {
  const { query, difficulty, cuisineType, mealType, dietaryTags, maxCookingTime, authorId } =
    params;

  const filters: SQL[] = [
    ...(authorId ? [eq(recipes.authorId, authorId)] : []),
    ...(query ? [ilike(recipes.title, `%${query}%`)] : []),
    ...(difficulty?.length ? [inArray(recipes.difficulty, difficulty)] : []),
    ...(cuisineType?.length ? [inArray(recipes.cuisineType, cuisineType)] : []),
    ...(mealType?.length ? [inArray(recipes.mealType, mealType)] : []),
    ...(dietaryTags?.length
      ? [
          sql`${recipes.dietaryTags} && ARRAY[${sql.join(
            dietaryTags.map((tag) => sql`${tag}`),
            sql`, `,
          )}]`,
        ]
      : []),
    ...(maxCookingTime
      ? [
          sql`(${recipes.preparationTime} + ${recipes.cookingTime} + ${recipes.restTime}) <= ${maxCookingTime}`,
        ]
      : []),
  ];

  return filters;
};
