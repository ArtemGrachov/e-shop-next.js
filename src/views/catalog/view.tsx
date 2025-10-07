import { ComponentType } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ROUTES } from '@/router/routes';

import CategoryNav from '@/components/categories/CategoryNav';
import ProductList from '@/components/products/ProductList';
import Pagination from '@/components/other/Pagination';
import ProductFilters from '@/components/products/ProductFilters';

import { getPageData } from './server';
import type { IViewCategoryProps } from './types';

import styles from './styles.module.scss';

const CatalogView: ComponentType<IViewCategoryProps> = async (props) => {
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
  ]).catch(err => {
    if (err === 404) {
      return notFound();
    }

    throw err;
  });

  const categories = data.categoriesResponse;
  const productsData = data.productsResponse;

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

  if (!category) {
    return notFound();
  }

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
    <div className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <CategoryNav className={styles.categoryNav} categories={categories} />
          {productsData && <ProductFilters filters={productsData.filters} />}
        </aside>
        <main className={styles.content}>
          <h1>
            {title}
          </h1>
          {description && <p>
            {description}
          </p>}
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
        </main>
      </div>
    </div>
  )
}

export default CatalogView;
