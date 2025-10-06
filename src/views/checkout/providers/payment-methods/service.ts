import { useRef } from 'react';
import { useStore } from 'zustand';

import { useHttpClientCtx } from '@/providers/http-client/hooks/use-http-client-ctx';

import { EActions, type State } from './store/types';
import { createPaymentMethodsStore } from './store';

import type { IPaymentMethod } from '@/types/models/payment-method';

export const usePaymentMethodsService = (initialState?: State) => {
  const httpClient = useHttpClientCtx();
  const storeRef = useRef(createPaymentMethodsStore(initialState));
  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const getPaymentMethods = async () => {
    try {
      dispatch({ type: EActions.GET });

      const { data } = await httpClient.get<IPaymentMethod[]>('/payment-methods');

      dispatch({ type: EActions.GET_SUCCESS, paymentMethods: data });
    } catch (err) {
      dispatch({ type: EActions.GET_ERROR });
      throw err;
    }
  }

  return {
    store: storeRef.current,
    getPaymentMethods,
  };
}
