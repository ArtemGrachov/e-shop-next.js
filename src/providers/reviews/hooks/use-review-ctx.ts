import { ReviewsContext } from '@/providers/reviews';
import { useContext } from 'react';

export const useReviewCtx = () => useContext(ReviewsContext);
