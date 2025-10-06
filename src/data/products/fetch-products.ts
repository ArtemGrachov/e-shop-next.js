import { HttpClient } from '@/providers/http-client/types';

import { PRODUCTS_PAGINATION } from '@/constants/products';

import type { IProduct } from '@/types/models/product';
import type { IProductsResponse } from '@/types/api/products';

export interface IFetchProductsParams {
  page?: number | string | null;
  categoryId?: number | string | null;
  search?: string | null;
  itemsPerPage?: string | number | null;
  filters?: {
    price: {
      min?: string | number | null;
      max?: string | number | null;
    };
  };
}

/**
 * JSON-server filters are very limited, so filtering
 * is performed on the frontend side
 * Real projects normally use filtering only and only
 * on the backend side
 */
export const fetchProducts = async (httpClient: HttpClient, params?: IFetchProductsParams) => {
  try {
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

    if (params?.filters?.price?.min) {
      const num = +params?.filters?.price?.min;

      if (!isNaN(num)) {
        priceMin = num;
      }
    }

    if (params?.filters?.price?.max) {
      const num = +params?.filters?.price?.max;

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

      return true;
    });

    const allPrices = products.reduce((acc, curr) => {
      if (curr.price?.value != null) {
        acc.push(curr.price?.value);
      }

      if (curr.variants) {
        const variantPrices = curr.variants.map(v => v.price.value);

        acc.push(...variantPrices);
      }

      return acc;
    }, [] as number[]);

    const priceRangeMin = Math.min(...allPrices, 0);
    const priceRangeMax = Math.max(...allPrices, 1);

    if (priceMin != null || priceMax != null) {
      products = data.filter(product => {
        const prices = [product.price?.value, ...(product.variants ?? []).map(pV => pV.price.value)].filter(v => v != null);

        if (priceMin != null && prices.every(v => v < priceMin)) {
          return false;
        }

        if (priceMax != null && prices.every(v => v > priceMax)) {
          return false;
        }

        return true;
      });
    }


    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (_start != null && _end != null) {
      products = products.slice(_start, _end);
    }

    const result: IProductsResponse = {
      pagination: {
        totalItems,
        totalPages: totalPages || 1,
        currentPage: page,
        itemsPerPage,
      },
      items: products,
      filters: {
        price: {
          type: 'range',
          rangeMin: priceRangeMin,
          rangeMax: priceRangeMax,
          valueMin: priceMin ?? priceRangeMin,
          valueMax: priceMax ?? priceRangeMax,
        },
      },
    };

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
