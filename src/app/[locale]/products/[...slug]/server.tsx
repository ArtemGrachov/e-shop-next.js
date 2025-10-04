import { fetchProduct } from '@/providers/product/api/fetch-product';
import { createHttpClient } from '@/providers/http-client/utils/create-http-client';

import { IPageProductProps } from './types';

export const getPageData = (async ({ params }: IPageProductProps) => {
  const { slug } = await params;
  const httpClient = createHttpClient();

  const [productSlug] = slug;
  const id = productSlug.split('-').slice(-1)[0];

  const productState = await fetchProduct(httpClient, { id });

  return { productState };
});
