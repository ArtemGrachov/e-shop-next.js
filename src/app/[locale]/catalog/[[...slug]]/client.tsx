'use client';

import { ComponentType, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { CategoriesProvider } from '@/providers/categories';
import { ProductsProvider } from '@/providers/products';
import { useCategoriesStore } from '@/providers/categories/hooks/use-categories-store';
import { useProductsStore } from '@/providers/products/hooks/use-products-store';

import ProductList from '@/components/products/ProductList';

import type { IPageCategoryProps } from './types';
import type { getPageData } from './server';

const CategoryPageClient: ComponentType<IPageCategoryProps> = () => {
  const locale = useLocale();
  const params = useParams();
  const categories = useCategoriesStore(s => s.categories);
  const products = useProductsStore(s => s.products);
  const t = useTranslations();

  const categorySlug = useMemo(() => {
    const slug = params.slug;

    if (!slug) {
      return null;
    }

    return slug[0];
  }, [params]);

  const categoryId = useMemo(() => {
    if (categorySlug == null) {
      return null;
    }

    const categoryId = categorySlug.split('-').slice(-1)[0];

    return categoryId;
  }, [categorySlug]);

  const category = useMemo(() => {
    if (!categoryId) {
      return null;
    }

    return categories.find(c => c.id === categoryId);
  }, [categories, categoryId]);

  const title = useMemo(() => {
    if (!category) {
      return t('page_catalog.title_catalog');
    }

    return category?.name[locale];
  }, [category]);

  const description = useMemo(() => {
    return category?.description?.[locale];
  }, [category]);

  return (
    <>
      <h1>
        {title}
      </h1>
      {description && <p>
        {description}
      </p>}
      <ProductList products={products} />
    </>
  )
}

const CategoryPageWrapper: ComponentType<IPageCategoryProps & Awaited<ReturnType<typeof getPageData>>> = (props) => {
  return (
    <CategoriesProvider initialState={props.categoriesState}>
      <ProductsProvider initialState={props.productsState}>
        <CategoryPageClient {...props} />
      </ProductsProvider>
    </CategoriesProvider>
  )
}

export default CategoryPageWrapper;