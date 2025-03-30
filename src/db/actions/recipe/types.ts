import { RecipeFormValues } from '@/components/forms/recipe/schemas';

import { PaginationRequest } from '@/types';

export type UpdateRecipeParams = RecipeFormValues & {
  id: string;
};

export interface GetMyRecipesParams {
  query?: string;
  difficulty?: string[];
  cuisineType?: string[];
  mealType?: string[];
  dietaryTags?: string[];
  maxCookingTime?: number;
}

export interface GetRecipesParams extends GetMyRecipesParams, PaginationRequest {
  authorId?: string;
}
