import { ComponentType } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { pathcat } from 'pathcat';

import { ROUTES } from '@/router/routes';

import CategoryNav from '@/views/catalog/components/CategoryNav';
import ProductList from '@/components/products/ProductList';
import Pagination from '@/components/other/Pagination';
import ProductFilters from '@/views/catalog/components/ProductFilters';
import MobileFilters from '@/views/catalog/components/MobileFilters';

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

  const getCategorySlugId = () => {
    const slug = params.slug;

    if (!slug) {
      return null;
    }

    return slug[0];
  };

  const splitCategorySlugId = () => {
    if (categorySlugId == null) {
      return [null, null];
    }

    const arr = categorySlugId.split('-');

    return [
      arr.slice(0, -1).join('-'),
      arr.slice(-1)[0],
    ];
  }

  const getCategory = () => {
    if (!categoryId) {
      return null;
    }

    return categories.find(c => c.id === categoryId);
  };

  const categorySlugId = getCategorySlugId();
  const [categorySlug, categoryId] = splitCategorySlugId();
  const category = getCategory();

  if (categorySlugId && !category) {
    return notFound();
  }

  if (category!.slug[locale] !== categorySlug) {
    const correctSlugId = `${category!.slug[locale]}-${categoryId}`;
    return redirect(pathcat(ROUTES.CATALOG, '/', { ...searchParams, slugId: correctSlugId }));
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
    <main className={styles.page}>
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
          <div className={styles.mobileFilters}>
            <MobileFilters data={data} />
          </div>
          <ProductList
            className={styles.list}
            products={productsData?.items}
          />
          <Pagination
            options={{
              currentPage: productsData?.pagination.currentPage ?? 1,
              totalPages: productsData?.pagination.totalPages ?? 1,
            }}
            linkParams={{
              path: ROUTES.CATALOG,
              params: {
                slugId: categorySlugId ? categorySlugId : '',
                ...searchParams,
              },
              pageKey: 'page',
            }}
          />
        </main>
      </div>
    </main>
  )
}

export default CatalogView;
