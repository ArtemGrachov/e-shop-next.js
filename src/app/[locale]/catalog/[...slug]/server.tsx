import { fetchCategory } from '@/providers/category/api/fetch-category';
import { createHttpClient } from '@/providers/http-client/utils/create-http-client';

import { IPageCategoryProps } from './types';

export const getPageData = (async ({ params }: IPageCategoryProps) => {
  const { slug } = await params;
  const httpClient = createHttpClient();

  const [categorySlug] = slug;
  const id = categorySlug.split('-').slice(-1)[0];

  const categoryState = await fetchCategory(httpClient, { id });

  return { categoryState };
});
