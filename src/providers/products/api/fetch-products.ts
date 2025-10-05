import { HttpClient } from '@/providers/http-client/types';

import { PRODUCTS_PAGINATION } from '@/constants/products';

import { EActions, type State } from '../store/types';
import { defaultInitState } from '../store/state';
import { reducer } from '../store/reducer';

import type { IProduct } from '@/types/models/product';
import type { IPagination } from '@/types/models/pagination';

export interface IFetchProductsParams {
  page?: number | string | null;
  categoryId?: number | string | null;
  search?: string | null;
  priceMin?: string | number | null;
  priceMax?: string | number | null;
  itemsPerPage?: string | number | null;
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

    let itemsPerPage = PRODUCTS_PAGINATION.ITEMS_PER_PAGE;

    if (params?.itemsPerPage) {
      const num = +params.itemsPerPage;

      if (!isNaN(num)) {
        itemsPerPage = num;
      }
    }

    let priceMin: number | null = null;
    let priceMax: number | null = null;

    if (params?.priceMin) {
      const num = +params.priceMin;

      if (!isNaN(num)) {
        priceMin = num;
      }
    }

    if (params?.priceMax) {
      const num = +params.priceMax;

      if (!isNaN(num)) {
        priceMax = num;
      }
    }

    const _start = (page - 1) * itemsPerPage;
    const _end = page * itemsPerPage;

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

      if (priceMin != null || priceMax != null) {
        const prices = [product.price?.value, ...(product.variants ?? []).map(pV => pV.price.value)].filter(v => v != null);

        if (priceMin != null && prices.every(v => v < priceMin)) {
          return false;
        }

        if (priceMax != null && prices.every(v => v > priceMax)) {
          return false;
        }
      }

      return true;
    });

    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (_start != null && _end != null) {
      products = products.slice(_start, _end);
    }

    const result: IPagination<IProduct> = {
      items: products,
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage,
    }

    state = reducer(state, { type: EActions.GET_SUCCESS, data: result });
  } catch (err) {
    console.error(err);
    state = reducer(state, { type: EActions.GET_ERROR });
  }

  return state;
}
