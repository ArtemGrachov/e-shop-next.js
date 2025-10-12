import { useRef } from 'react';
import { useStore } from 'zustand';

import { useHttpClientCtx } from '@/providers/http-client/hooks/use-http-client-ctx';

import { EActions, type State } from './store/types';
import { createProductsStore } from './store';

import type { IProductsQuery, IProductsResponse } from '@/types/api/products';

export const useProductsService = (initialState?: State) => {
  const httpClient = useHttpClientCtx();
  const storeRef = useRef(createProductsStore(initialState));
  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const getProducts = async (params: IProductsQuery) => {
    try {
      dispatch({ type: EActions.GET });
      const { data } = await httpClient.get<IProductsResponse>('/products', { params });
      dispatch({ type: EActions.GET_SUCCESS, data });
    } catch (err) {
      dispatch({ type: EActions.GET_ERROR });
      throw err;
    }
  }

  return {
    store: storeRef.current,
    getProducts: getProducts,
  };
}
