import dayjs from 'dayjs';
import { SQL, eq, gte, ilike } from 'drizzle-orm';

import { GetCommentsParams, comments } from '@/db';

export const createCommentSqlFilters = (params: GetCommentsParams): SQL[] => {
  const { query, rating, timePeriod } = params;

  const filters: SQL[] = [
    ...(query ? [ilike(comments.content, `%${query}%`)] : []),
    ...(rating ? [eq(comments.rating, parseInt(rating as string, 10))] : []),
  ];

  if (timePeriod && timePeriod !== 'all') {
    const now = dayjs();
    let dateLimit;

    switch (timePeriod) {
      case 'week':
        dateLimit = now.subtract(1, 'week');
        break;
      case 'month':
        dateLimit = now.subtract(1, 'month');
        break;
      case 'quarter':
        dateLimit = now.subtract(3, 'month');
        break;
      case 'year':
        dateLimit = now.subtract(1, 'year');
        break;
      default:
        dateLimit = dayjs('1970-01-01'); // Beginning of time
    }

    filters.push(gte(comments.createdAt, dateLimit.toDate()));
  }

  return filters;
};
