import { ComponentType } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import { ROUTES } from '@/router/routes';

import CategoryNav from '@/components/categories/CategoryNav';
import ProductList from '@/components/products/ProductList';
import Pagination from '@/components/other/Pagination';
import ProductFilters from '@/components/products/ProductFilters';

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
    const categoryName = category?.name[locale];

    if (searchParams.search) {
      if (categoryName) {
        return t('page_catalog.title_category_search', { categoryName, query: searchParams.search })
      } else {
        return t('page_catalog.title_search', { query: searchParams.search })
      }
    }

    if (categoryName) {
      return categoryName;
    }

    return t('page_catalog.title_catalog');
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
      <ProductFilters />
      <ProductList products={productsData?.items} />
      <Pagination
        options={{
          currentPage: productsData?.pagination.currentPage ?? 1,
          totalPages: productsData?.pagination.totalPages ?? 1,
        }}
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
