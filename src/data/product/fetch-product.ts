import { HttpClient } from '@/providers/http-client/types';

import type { IProduct } from '@/types/models/product';

export interface IFetchProductParams {
  id: number | string;
}

export const fetchProduct = async (httpClient: HttpClient, params: IFetchProductParams) => {
  try {
    const response = await httpClient.get<IProduct>(`/products/${params.id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
