'use server';

import { currentUser } from '@clerk/nextjs/server';

import { handleError } from '@/utils';

import {
  AnalyticsData,
  EngagementStats,
  RecentComment,
  RecipePerformance,
  SentimentStats,
  TopRecipe,
  getEngagements,
  getMetrics,
  getRecentComments,
  getRecipePerformance,
  getSentiment,
  getTopPerformingRecipes,
} from '@/db';

export interface ExportAnalyticsData {
  metrics: AnalyticsData;
  topRecipes: TopRecipe[];
  recipePerformance: RecipePerformance[];
  engagements: EngagementStats;
  sentiment: SentimentStats;
  recentComments: RecentComment[];
}

export async function exportAnalyticsData(
  period: string,
): Promise<ExportAnalyticsData | undefined> {
  try {
    const user = await currentUser();
    if (!user) throw new Error('User not found');

    const [metrics, topRecipes, recipePerformance, engagements, sentiment, recentComments] =
      await Promise.all([
        getMetrics(period),
        getTopPerformingRecipes(period),
        getRecipePerformance(period, 'views'),
        getEngagements(period),
        getSentiment(period),
        getRecentComments(period),
      ]);

    return {
      metrics: metrics || {
        totalViews: 0,
        totalSaves: 0,
        totalComments: 0,
        viewsChange: 0,
        savesChange: 0,
        commentsChange: 0,
      },
      topRecipes: topRecipes || [],
      recipePerformance: recipePerformance || [],
      engagements: engagements || {
        comments: { count: 0, trend: '0%' },
        saves: { count: 0, trend: '0%' },
      },
      sentiment: sentiment || {
        positive: 0,
        neutral: 0,
        negative: 0,
      },
      recentComments: recentComments || [],
    };
  } catch (error) {
    handleError(error);
    return undefined;
  }
}
