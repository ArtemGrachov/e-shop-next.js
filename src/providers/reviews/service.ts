import { useRef } from 'react';
import { useStore } from 'zustand';
import { v4 as uuid } from '@lukeed/uuid';

import { EActions } from './store/types';
import { createReviewStore } from './store';

import { useHttpClientCtx } from '@/providers/http-client/hooks/use-http-client-ctx';
import { defaultInitState } from '@/providers/reviews/store/state';

import type { IReview } from '@/types/models/review';
import type { IProduct } from '@/types/models/product';

export interface IOptions {
  reviews?: IReview[];
}

export const useReviewService = ({ reviews }: IOptions) => {
  const storeRef = useRef(createReviewStore({ ...defaultInitState, reviews: reviews ?? [] }));
  const dispatch = useStore(storeRef.current, s => s.dispatch);
  const httpClient = useHttpClientCtx();

  const sendReview = async (productId: number | string, review: IReview) => {
    try {
      dispatch({ type: EActions.SUBMIT });

      // workaround for json-server 
      const { data: product } = await httpClient.get<IProduct>(`/products/${productId}`);

      const payload: IReview = {
        ...review,
        id: uuid(),
      };

      if (!product.reviews) {
        product.reviews = [];
      }

      product.reviews.push(payload);

      const { data } = await httpClient.patch<IProduct>(`/products/${productId}`, JSON.stringify(product));

      dispatch({ type: EActions.SUBMIT_SUCCESS, review: payload });

      return data;
    } catch (err) {
      dispatch({ type: EActions.SUBMIT_ERROR });
      throw err;
    }
  }

  return {
    store: storeRef.current,
    sendReview,
  };
}
