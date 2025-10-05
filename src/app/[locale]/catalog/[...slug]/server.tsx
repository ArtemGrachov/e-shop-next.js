import { createHttpClient } from '@/providers/http-client/utils/create-http-client';
import { fetchCategories } from '@/providers/categories/api/fetch-categories';

import { IPageCategoryProps } from './types';

export const getPageData = async (_props: IPageCategoryProps) => {
  const httpClient = createHttpClient();

  const categoriesState = await fetchCategories(httpClient);

  return { categoriesState };
};
