'use client';

import { ComponentType, PropsWithChildren } from 'react';

import { ReviewsProvider } from './providers/reviews';
import { CurrentVariantProvider } from './providers/current-variant';

import type { IViewProductProps } from './types';
import type { getPageData } from './server';

const ProductPageWrapper: ComponentType<PropsWithChildren & IViewProductProps & Awaited<ReturnType<typeof getPageData>>> = (props) => {
  return (
    <CurrentVariantProvider product={props.product}>
      <ReviewsProvider reviews={props.product.reviews}>
        {props.children}
      </ReviewsProvider>
    </CurrentVariantProvider>
  )
}

export default ProductPageWrapper;
