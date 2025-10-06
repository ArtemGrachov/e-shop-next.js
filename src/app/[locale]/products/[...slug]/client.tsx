'use client';

import { ComponentType, PropsWithChildren } from 'react';

import { ReviewsProvider } from '@/providers/reviews';
import { CurrentVariantProvider } from './providers/current-variant';

import type { IPageProductProps } from './types';
import type { getPageData } from './server';

const ProductPageWrapper: ComponentType<PropsWithChildren & IPageProductProps & Awaited<ReturnType<typeof getPageData>>> = (props) => {
  return (
    <CurrentVariantProvider product={props.product}>
      <ReviewsProvider>
        {props.children}
      </ReviewsProvider>
    </CurrentVariantProvider>
  )
}

export default ProductPageWrapper;
