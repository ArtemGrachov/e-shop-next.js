import { useStore } from 'zustand';

import { useReviewCtx } from '../hooks/use-review-ctx';
import { ReviewStore } from '../store/types';

export const useReviewStore = <T,>(
  selector: (store: ReviewStore) => T,
): T => {
  const ctx = useReviewCtx();

  return useStore(ctx.store, selector);
}
