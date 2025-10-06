import { HttpClient } from '@/providers/http-client/types';

import type { ICategory } from '@/types/models/category';

export const fetchCategories = async (httpClient: HttpClient) => {
  try {
    const response = await httpClient.get<ICategory[]>(`/categories`);

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
