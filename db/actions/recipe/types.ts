import { RecipeFormValues } from '@/components/forms/RecipeForm';

import { SearchParams } from '@/types';

export type CreateRecipeParams = RecipeFormValues & {};

export type UpdateRecipeParams = RecipeFormValues & {
  id: string;
};

export type GetMyRecipesParams = SearchParams & {};
