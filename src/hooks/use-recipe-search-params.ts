import { PageProps } from '@/types';

export const useRecipeSearchParams = (searchParams: PageProps['searchParams']) => {
  const { difficulty, cuisineType, mealType, dietaryTags, maxCookingTime, query } =
    searchParams || {};

  const difficultyParam = difficulty ? (difficulty as string).split('_') : [];
  const cuisineTypeParam = cuisineType ? (cuisineType as string).split('_') : [];
  const mealTypeParam = mealType ? (mealType as string).split('_') : [];
  const dietaryTagsParam = dietaryTags ? (dietaryTags as string).split('_') : [];
  const maxCookingTimeParam = maxCookingTime as string | undefined;
  const queryParam = query as string;

  return {
    queryParam,
    difficultyParam,
    cuisineTypeParam,
    mealTypeParam,
    dietaryTagsParam,
    maxCookingTimeParam: maxCookingTimeParam ? parseInt(maxCookingTimeParam) : undefined,
  };
};
