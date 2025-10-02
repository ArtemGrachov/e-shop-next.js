import { useStore } from 'zustand';

import { useReviewCtx } from '@/providers/reviews/hooks/use-review-ctx';
import { ReviewStore } from '@/providers/reviews/store/types';

export const useReviewStore = <T,>(
  selector: (store: ReviewStore) => T,
): T => {
  const ctx = useReviewCtx();

  return useStore(ctx.store, selector);
}
