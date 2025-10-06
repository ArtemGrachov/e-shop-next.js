import { createHttpClient } from '@/providers/http-client/utils/create-http-client';
import { fetchCategories } from '@/data/categories/fetch-categories';
import { fetchProducts } from '@/data/products/fetch-products';

import { IPageCategoryProps } from '../../app/[locale]/catalog/[[...slug]]/types';

export const getPageData = async ({ params ,searchParams }: IPageCategoryProps) => {
  const [{ slug }, { page, search, ['price[min]']: priceMin, ['price[max]']: priceMax }] = await Promise.all([params, searchParams]);

  let categoryId;

  if (slug) {
    const [categorySlug] = slug;
    categoryId = categorySlug.split('-').slice(-1)[0];
  }

  const httpClient = createHttpClient();

  const [categoriesResponse, productsResponse] = await Promise.all([
    fetchCategories(httpClient),
    fetchProducts(
      httpClient,
      {
        page,
        categoryId,
        search,
        filters: {
          price: {
            min: priceMin,
            max: priceMax,
          },
        },
      }),
  ]);

  return { categoriesResponse, productsResponse };
};
