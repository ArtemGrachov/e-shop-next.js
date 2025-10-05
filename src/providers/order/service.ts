import { useRef } from 'react';
import { useStore } from 'zustand';

import { useHttpClientCtx } from '@/providers/http-client/hooks/use-http-client-ctx';

import { EActions, type State } from './store/types';
import { createOrderStore } from './store';

import type { IOrder } from '@/types/models/order';

export const useOrderService = (initialState?: State) => {
  const httpClient = useHttpClientCtx();
  const storeRef = useRef(createOrderStore(initialState));
  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const getOrder = async (orderId: string) => {
    try {
      dispatch({ type: EActions.GET });

      const { data } = await httpClient.get<IOrder>(`/orders/${orderId}`);

      dispatch({ type: EActions.GET_SUCCESS, order: data });
    } catch (err) {
      dispatch({ type: EActions.GET_ERROR });
      throw err;
    }
  }

  return {
    store: storeRef.current,
    getOrder,
  };
}
