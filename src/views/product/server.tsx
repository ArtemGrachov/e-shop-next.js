import { fetchProduct } from '@/data/product/fetch-product';
import { createHttpClient } from '@/providers/http-client/utils/create-http-client';

import { IViewProductProps } from './types';

export const getPageData = (async ({ params }: IViewProductProps) => {
  const { slug } = await params;
  const httpClient = createHttpClient();

  const [productSlug] = slug;
  const id = productSlug.split('-').slice(-1)[0];

  const product = await fetchProduct(httpClient, { id });

  return { product };
});
