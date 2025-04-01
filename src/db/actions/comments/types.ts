import { PaginationRequest } from '@/types';

export interface GetCommentsParams extends PaginationRequest {
  query?: string;
  rating?: string;
  sortBy?: string;
  status?: string;
  timePeriod?: string;
}
