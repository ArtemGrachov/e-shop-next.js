import { HttpClient } from '@/providers/http-client/types';

import { PRODUCTS_PAGINATION } from '@/constants/products';

import { EActions, type State } from '../store/types';
import { defaultInitState } from '../store/state';
import { reducer } from '../store/reducer';

import type { IProduct } from '@/types/models/product';

export interface IFetchProductsParams {
  page?: number;
}

export const fetchProducts = async (httpClient: HttpClient, params?: IFetchProductsParams): Promise<State> => {
  let state = defaultInitState;

  try {
    state = reducer(state, { type: EActions.GET });

    let page = params?.page ?? 1;

    if (isNaN(page)) {
      page = 1;
    }

    const _start = (page - 1) * PRODUCTS_PAGINATION.ITEMS_PER_PAGE;
    const _end = page * PRODUCTS_PAGINATION.ITEMS_PER_PAGE;

    const response = await httpClient.get<IProduct[]>('/products', {
      params: {
        _start,
        _end,
      },
    });

    state = reducer(state, { type: EActions.GET_SUCCESS, products: response.data });
  } catch (err) {
    console.error(err);
    state = reducer(state, { type: EActions.GET_ERROR });
  }

  return state;
}
