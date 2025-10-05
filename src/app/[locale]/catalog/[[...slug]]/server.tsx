import { createHttpClient } from '@/providers/http-client/utils/create-http-client';
import { fetchCategories } from '@/providers/categories/api/fetch-categories';
import { fetchProducts } from '@/providers/products/api/fetch-products';

import { IPageCategoryProps } from './types';

export const getPageData = async ({ params ,searchParams }: IPageCategoryProps) => {
  const [{ slug }, { page, search, priceMin, priceMax }] = await Promise.all([params, searchParams]);

  let categoryId;

  if (slug) {
    const [categorySlug] = slug;
    categoryId = categorySlug.split('-').slice(-1)[0];
  }

  const httpClient = createHttpClient();

  const [categoriesState, productsState] = await Promise.all([
    fetchCategories(httpClient),
    fetchProducts(httpClient, { page, categoryId, search, priceMin, priceMax }),
  ]);

  return { categoriesState, productsState };
};
