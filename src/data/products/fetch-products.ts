import { HttpClient } from '@/providers/http-client/types';

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

export const fetchProducts = async (httpClient: HttpClient, params?: IFetchProductsParams) => {
  try {
    const query = {
      page: params?.page,
      itemsPerPage: params?.itemsPerPage,
      'price[min]': params?.filters?.price.min,
      'price[max]': params?.filters?.price.max,
      categoryId: params?.categoryId,
      search: params?.search,
    };

    const { data } = await httpClient('/products', { params: query });

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
