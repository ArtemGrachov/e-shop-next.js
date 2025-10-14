import { ComponentType } from 'react';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/router/routes';

import { getRoutePath } from '@/hooks/routing/use-route-path';
import ProductList from '@/components/products/ProductList';
import Pagination from '@/components/other/Pagination';
import CategoryNav from './components/CategoryNav';
import ProductFilters from './components/ProductFilters';
import MobileFilters from './components/MobileFilters';
import Breadcrumbs from '@/components/other/Breadcrumbs';
import ProductsPlaceholder from '@/components/products/ProductsPlaceholder';

import type { IBreadcrumb } from '@/types/other/breadcrumbs';

import { getPageData } from './server';
import type { IViewCatalogOptions, IViewCatalogProps } from './types';

import styles from './styles.module.scss';

const baseData = async (props: IViewCatalogProps, options?: IViewCatalogOptions) => {
  const [
    t,
    locale,
    params,
    searchParams,
    data,
    routePath,
  ] = await Promise.all([
    getTranslations(),
    getLocale(),
    props.params,
    props.searchParams,
    getPageData(props, options),
    getRoutePath(),
  ]).catch(err => {
    if (err === 404) {
      return notFound();
    }

    throw err;
  });

  const categories = data.categoriesResponse;
  const productsData = data.productsResponse;

  const categorySlugId = params.slug ? params.slug[0] : null;
  const categorySlugArr = categorySlugId?.split('-');
  const categorySlug = categorySlugArr?.slice(0, -1).join('-');
  const categoryId = categorySlugArr?.slice(-1)[0];

  const category =  categories.find(c => c.id === categoryId);
  const correctCategorySlug = category?.slug[locale];

  const isCategory = !!category;
  const isSearch = !!searchParams.search;
  const isSales = !!options?.sale;

  const correctSlugId = isCategory ? `${correctCategorySlug}-${categoryId}` : null;
  const correctPath = routePath(ROUTES.CATALOG, { ...searchParams, slugId: correctSlugId || '' })

  const getTitle = () => {
    const categoryName = category?.name[locale];

    if (isSearch) {
      if (categoryName) {
        if (isSales) {
          return t('view_catalog.title_sales_category_search', { categoryName, query: searchParams.search! })
        }

        return t('view_catalog.title_category_search', { categoryName, query: searchParams.search! })
      } else {
        if (isSales) {
          return t('view_catalog.title_sales_search', { query: searchParams.search! })
        }

        return t('view_catalog.title_search', { query: searchParams.search! })
      }
    }

    if (isSales) {
      if (isCategory) {
        return t('view_catalog.title_sales_category', { categoryName: categoryName ?? '-' });
      }

      return t('view_catalog.title_sales');
    }

    if (isCategory) {
      return categoryName;
    }

    return t('view_catalog.title_catalog');
  };

  const title = getTitle();
  const description = category?.description?.[locale];

  return {
    categorySlugId,
    category,
    isCategory,
    isSearch,
    isSales,
    categorySlug,
    correctCategorySlug,
    correctPath,
    t,
    routePath,
    title,
    description,
    productsData,
    categories,
    searchParams,
    data,
  };
}

const CatalogView = (options: IViewCatalogOptions): ComponentType<IViewCatalogProps> => async (props) => {
  const {
    categorySlugId,
    category,
    isCategory,
    isSearch,
    categorySlug,
    correctCategorySlug,
    correctPath,
    t,
    routePath,
    title,
    description,
    productsData,
    categories,
    searchParams,
    data,
  } = await baseData(props, options);

  if (categorySlugId && !category) {
    return notFound();
  }

  if (isCategory && categorySlug !== correctCategorySlug) {
    return redirect(correctPath);
  }

  const breadcrumbs: IBreadcrumb[] = [
    {
      label: t('common_breadcrumbs.home'),
      path: routePath(ROUTES.HOME),
    },
    {
      label: t('common_breadcrumbs.catalog'),
      path: routePath(ROUTES.CATALOG, { slugId: '' }),
    },
  ];

  if (isCategory || isSearch) {
    breadcrumbs.push({
      label: title,
      path: correctPath,
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className={styles.row}>
          <aside className={styles.sidebar}>
            <CategoryNav className={styles.categoryNav} categories={categories} isSale={options?.sale} />
            {productsData && <ProductFilters filters={productsData.filters} />}
          </aside>
          <main className={styles.content}>
            <h1>
              {title}
            </h1>
            {description && <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />}
            <div className={styles.mobileFilters}>
              <MobileFilters data={data} isSale={options?.sale} />
            </div>
            {productsData?.items?.length ? (
              <ProductList
                className={styles.list}
                products={productsData.items}
              />
            ) : <ProductsPlaceholder />}
            {
              ((productsData?.pagination.totalPages ?? 0) > 1) ? (
                <Pagination
                  className={styles.pagination}
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
              ) : null
            }
          </main>
        </div>
      </div>
    </div>
  )
}

export default CatalogView;

export function generateMetadataWrap(options?: IViewCatalogOptions) {
  async function generateMetadata(props: IViewCatalogProps): Promise<Metadata> {
    const {
      t,
      title,
      description,
    } = await baseData(props, options);
  
    return {
      title: t('common_meta.title_template', { title: title ?? '-' }),
      description,
    };
  }

  return generateMetadata;
}

