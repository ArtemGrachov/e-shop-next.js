import { HttpClient } from '@/providers/http-client/types';

import { EActions, type State } from '../store/types';
import { defaultInitState } from '../store/state';
import { reducer } from '../store/reducer';

import type { IProduct } from '@/types/models/product';

export interface IFetchProductParams {
  id: number | string;
}

export const fetchProduct = async (httpClient: HttpClient, params: IFetchProductParams): Promise<State> => {
  let state = defaultInitState;

  try {
    state = reducer(state, { type: EActions.GET_PRODUCT });
    const response = await httpClient.get<IProduct>(`/products/${params.id}`);

    state = reducer(state, { type: EActions.GET_PRODUCT_SUCCESS, product: response.data });
  } catch (err) {
    console.error(err);
    state = reducer(state, { type: EActions.GET_PRODUCT_ERROR });
  }

  return state;
}
