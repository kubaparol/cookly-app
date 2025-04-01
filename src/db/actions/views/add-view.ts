'use server';

import { and } from 'drizzle-orm';
import { eq } from 'drizzle-orm';

import { getIpAddress } from '@/utils';

import { db } from '@/db/drizzle';
import { views } from '@/db/schema';

import { ServerActionResponse } from '@/types';

export async function addView(recipeId: string): Promise<ServerActionResponse> {
  const ipAddress = await getIpAddress();

  try {
    const existingView = await db.query.views.findFirst({
      where: and(eq(views.recipeId, recipeId), eq(views.ipAddress, ipAddress)),
      columns: {
        id: true,
      },
    });

    if (!existingView) {
      await db.insert(views).values({
        recipeId,
        ipAddress,
      });
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to add view: ${typeof error === 'string' ? error : JSON.stringify(error)}`,
    };
  }
}
