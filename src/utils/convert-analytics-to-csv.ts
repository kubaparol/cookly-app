import dayjs from 'dayjs';

export function convertToCSV(data: any, section: string): string {
  if (!data) return '';

  let csv = '';

  switch (section) {
    case 'metrics':
      csv = 'Metric,Value,Change\n';
      csv += `Views,${data.totalViews},${data.viewsChange}%\n`;
      csv += `Saves,${data.totalSaves},${data.savesChange}%\n`;
      csv += `Comments,${data.totalComments},${data.commentsChange}%\n`;
      break;

    case 'topRecipes':
      csv = 'Title,Views,Saves,Comments,Rating,Trend\n';
      data.forEach((recipe: any) => {
        csv += `"${recipe.title}",${recipe.views},${recipe.saves},${recipe.comments},${recipe.rating.toFixed(1)},${recipe.trend}\n`;
      });
      break;

    case 'recipePerformance':
      csv = 'Title,Views,Saves,Comments,Rating,Trend\n';
      data.forEach((recipe: any) => {
        csv += `"${recipe.title}",${recipe.views},${recipe.saves},${recipe.comments},${recipe.rating.toFixed(1)},${recipe.trend}\n`;
      });
      break;

    case 'engagements':
      csv = 'Type,Count,Trend\n';
      csv += `Comments,${data.comments.count},${data.comments.trend}\n`;
      csv += `Saves,${data.saves.count},${data.saves.trend}\n`;
      break;

    case 'sentiment':
      csv = 'Type,Count\n';
      csv += `Positive,${data.positive}\n`;
      csv += `Neutral,${data.neutral}\n`;
      csv += `Negative,${data.negative}\n`;
      break;

    case 'recentComments':
      csv = 'Recipe,Comment,Author,Date,Sentiment\n';
      data.forEach((comment: any) => {
        csv += `"${comment.recipe.title}","${comment.content.replace(/"/g, '""')}","${comment.author}","${dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm:ss')}",${comment.sentiment}\n`;
      });
      break;

    case 'all':
      // Metrics
      csv = '# METRICS\n';
      csv += 'Metric,Value,Change\n';
      csv += `Views,${data.metrics.totalViews},${data.metrics.viewsChange}%\n`;
      csv += `Saves,${data.metrics.totalSaves},${data.metrics.savesChange}%\n`;
      csv += `Comments,${data.metrics.totalComments},${data.metrics.commentsChange}%\n\n`;

      // Top Recipes
      csv += '# TOP RECIPES\n';
      csv += 'Title,Views,Saves,Comments,Rating,Trend\n';
      data.topRecipes.forEach((recipe: any) => {
        csv += `"${recipe.title}",${recipe.views},${recipe.saves},${recipe.comments},${recipe.rating.toFixed(1)},${recipe.trend}\n`;
      });
      csv += '\n';

      // Recipe Performance
      csv += '# RECIPE PERFORMANCE\n';
      csv += 'Title,Views,Saves,Comments,Rating,Trend\n';
      data.recipePerformance.forEach((recipe: any) => {
        csv += `"${recipe.title}",${recipe.views},${recipe.saves},${recipe.comments},${recipe.rating.toFixed(1)},${recipe.trend}\n`;
      });
      csv += '\n';

      // Engagements
      csv += '# ENGAGEMENTS\n';
      csv += 'Type,Count,Trend\n';
      csv += `Comments,${data.engagements.comments.count},${data.engagements.comments.trend}\n`;
      csv += `Saves,${data.engagements.saves.count},${data.engagements.saves.trend}\n\n`;

      // Sentiment
      csv += '# SENTIMENT\n';
      csv += 'Type,Count\n';
      csv += `Positive,${data.sentiment.positive}\n`;
      csv += `Neutral,${data.sentiment.neutral}\n`;
      csv += `Negative,${data.sentiment.negative}\n`;
      csv += `Trend,${data.sentiment.trend}\n\n`;

      // Recent Comments
      csv += '# RECENT COMMENTS\n';
      csv += 'Recipe,Comment,Author,Date,Sentiment\n';
      data.recentComments.forEach((comment: any) => {
        csv += `"${comment.recipe.title}","${comment.content.replace(/"/g, '""')}","${comment.author}","${dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm:ss')}",${comment.sentiment}\n`;
      });
      break;
  }

  return csv;
}
