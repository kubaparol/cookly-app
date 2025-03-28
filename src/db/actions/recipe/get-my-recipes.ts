'use server';

import { currentUser } from '@clerk/nextjs/server';

import { handleError } from '@/utils';

import { getRecipes } from './get-recipes';
import { GetMyRecipesParams } from './types';

export async function getMyRecipes(params: GetMyRecipesParams) {
  try {
    const user = await currentUser();

    if (!user) throw new Error('User not found');

    return await getRecipes({
      ...params,
      authorId: user.id,
    });
  } catch (error) {
    handleError(error);
  }
}
