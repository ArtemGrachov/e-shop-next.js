'use client';

import { ComponentType } from 'react';
import { useLocale } from 'next-intl';

import { CategoryProvider } from '@/providers/category';
import { CategoriesProvider } from '@/providers/categories';
import { useCategoryStore } from '@/providers/category/hooks/use-category-store';

import type { IPageCategoryProps } from './types';
import type { getPageData } from './server';

const CategoryPageClient: ComponentType<IPageCategoryProps> = () => {
  const category = useCategoryStore(s => s.category);
  const locale = useLocale();

  return (
    <>
      <h1>
        {category?.name[locale]}
      </h1>
      <p>
        {category?.description?.[locale]}
      </p>
    </>
  )
}

const CategoryPageWrapper: ComponentType<IPageCategoryProps & Awaited<ReturnType<typeof getPageData>>> = (props) => {
  return (
    <CategoryProvider initialState={props.categoryState}>
      <CategoriesProvider initialState={props.categoriesState}>
        <CategoryPageClient {...props} />
      </CategoriesProvider>
    </CategoryProvider>
  )
}

export default CategoryPageWrapper;