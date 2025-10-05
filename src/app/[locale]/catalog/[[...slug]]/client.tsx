'use client';

import { ComponentType, PropsWithChildren } from 'react';

import { CategoriesProvider } from '@/providers/categories';
import { ProductsProvider } from '@/providers/products';

import type { IPageCategoryProps } from './types';
import type { getPageData } from './server';

const CategoryPageWrapper: ComponentType<PropsWithChildren & IPageCategoryProps & Awaited<ReturnType<typeof getPageData>>> = (props) => {
  return (
    <CategoriesProvider initialState={props.categoriesState}>
      <ProductsProvider initialState={props.productsState}>
        {props.children}
      </ProductsProvider>
    </CategoriesProvider>
  )
}

export default CategoryPageWrapper;