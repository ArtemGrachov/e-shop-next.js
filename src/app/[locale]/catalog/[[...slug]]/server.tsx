import { createHttpClient } from '@/providers/http-client/utils/create-http-client';
import { fetchCategories } from '@/providers/categories/api/fetch-categories';
import { fetchProducts } from '@/providers/products/api/fetch-products';

import { IPageCategoryProps } from './types';

export const getPageData = async ({ searchParams }: IPageCategoryProps) => {
  const { page } = await searchParams;

  const httpClient = createHttpClient();

  const [categoriesState, productsState] = await Promise.all([
    fetchCategories(httpClient),
    fetchProducts(httpClient, { page }),
  ]);

  return { categoriesState, productsState };
};
