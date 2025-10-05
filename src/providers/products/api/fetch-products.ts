import { HttpClient } from '@/providers/http-client/types';

import { PRODUCTS_PAGINATION } from '@/constants/products';

import { EActions, type State } from '../store/types';
import { defaultInitState } from '../store/state';
import { reducer } from '../store/reducer';

import type { IProduct } from '@/types/models/product';

export interface IFetchProductsParams {
  page?: number | string;
  categoryId?: number | string;
  search?: string;
}

/**
 * JSON-server filters are very limited, so filtering
 * is performed on the frontend side
 * Real projects normally use filtering only and only
 * on the backend side
 */
export const fetchProducts = async (httpClient: HttpClient, params?: IFetchProductsParams): Promise<State> => {
  let state = defaultInitState;

  try {
    state = reducer(state, { type: EActions.GET });

    let page = 1;

    if (params?.page) {
      page = +params.page;
    }

    if (isNaN(page)) {
      page = 1;
    }

    if (page < 1) {
      page = 1;
    }

    const _start = (page - 1) * PRODUCTS_PAGINATION.ITEMS_PER_PAGE;
    const _end = page * PRODUCTS_PAGINATION.ITEMS_PER_PAGE;

    const categoryId = params?.categoryId;
    const search = params?.search?.toLowerCase();

    const { data } = await httpClient.get<IProduct[]>('/products');

    let products = data.filter(product => {
      if (categoryId && !product.categoryIds.some(cId => cId == categoryId)) {
        return false;
      }

      if (search) {
        const searchIn = [
          ...Object.values(product.name).map(s => s.toLowerCase()),
          ...Object.values(product.description).map(s => s.toLowerCase()),
        ].join(' | ');

        if (!searchIn.includes(search)) {
          return false;
        }
      }

      return true;
    });

    if (_start != null && _end != null) {
      products = products.slice(_start, _end);
    }

    state = reducer(state, { type: EActions.GET_SUCCESS, products });
  } catch (err) {
    console.error(err);
    state = reducer(state, { type: EActions.GET_ERROR });
  }

  return state;
}
