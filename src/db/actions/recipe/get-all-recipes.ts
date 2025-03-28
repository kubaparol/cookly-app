'use server';

import { handleError } from '@/utils';

import { getRecipes } from './get-recipes';
import { GetMyRecipesParams } from './types';

export async function getAllRecipes(params: GetMyRecipesParams) {
  try {
    return await getRecipes(params);
  } catch (error) {
    handleError(error);
  }
}
