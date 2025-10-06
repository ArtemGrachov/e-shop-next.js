'use client';

import { ComponentType, PropsWithChildren } from 'react';

import { ProductProvider } from '@/providers/product';
import { ReviewsProvider } from '@/providers/reviews';
import { CurrentVariantProvider } from './providers/current-variant';

import type { IPageProductProps } from './types';
import type { getPageData } from './server';

const ProductPageWrapper: ComponentType<PropsWithChildren & IPageProductProps & Awaited<ReturnType<typeof getPageData>>> = (props) => {
  return (
    <ProductProvider initialState={props.productState}>
      <CurrentVariantProvider product={props.productState.product!}>
        <ReviewsProvider>
          {props.children}
        </ReviewsProvider>
      </CurrentVariantProvider>
    </ProductProvider>
  )
}

export default ProductPageWrapper;