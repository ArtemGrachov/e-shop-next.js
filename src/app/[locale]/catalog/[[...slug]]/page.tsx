import { ComponentType } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import { ROUTES } from '@/router/routes';

import CategoryNav from '@/components/categories/CategoryNav';
import ProductList from '@/components/products/ProductList';
import Pagination from '@/components/other/Pagination';

import CategoryPageWrapper from './client';
import { getPageData } from './server';
import type { IPageCategoryProps } from './types';

const CatalogPage: ComponentType<IPageCategoryProps> = async (props) => {
  const [
    t,
    locale,
    params,
    searchParams,
    data,
  ] = await Promise.all([
    getTranslations(),
    getLocale(),
    props.params,
    props.searchParams,
    getPageData(props),
  ])

  const categories = data.categoriesState.categories;
  const productsData = data.productsState.data;

  const getCategorySlug = () => {
    const slug = params.slug;

    if (!slug) {
      return null;
    }

    return slug[0];
  };

  const categorySlug = getCategorySlug();

  const getCategoryId = () => {
    if (categorySlug == null) {
      return null;
    }

    const categoryId = categorySlug.split('-').slice(-1)[0];

    return categoryId;
  };

  const categoryId = getCategoryId();

  const getCategory = () => {
    if (!categoryId) {
      return null;
    }

    return categories.find(c => c.id === categoryId);
  };

  const category = getCategory();

  const getTitle = () => {
    if (!category) {
      return t('page_catalog.title_catalog');
    }

    return category?.name[locale];
  };

  const title = getTitle();

  const getDescription = () => {
    return category?.description?.[locale];
  };

  const description = getDescription();

  return (
    <CategoryPageWrapper {...props} {...data}>
      <h1>
        {title}
      </h1>
      {description && <p>
        {description}
      </p>}
      <CategoryNav categories={categories} />
      <ProductList products={productsData?.items} />
      <Pagination
        options={{ currentPage: productsData?.currentPage ?? 1, totalPages: productsData?.totalPages ?? 1 }}
        linkParams={{
          path: ROUTES.CATALOG,
          params: {
            slugId: categorySlug ? categorySlug : '',
            ...searchParams,
          },
          pageKey: 'page',
        }}
      />
    </CategoryPageWrapper>
  )
}

export default CatalogPage;
