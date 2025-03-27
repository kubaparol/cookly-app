import { RecipeFormValues } from '@/components/forms/recipe/schemas';

export type UpdateRecipeParams = RecipeFormValues & {
  id: string;
};

export type GetMyRecipesParams = {
  search?: string;
  page?: number;
  limit?: number;
};
