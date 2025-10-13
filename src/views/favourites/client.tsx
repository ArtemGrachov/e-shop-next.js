'use client';

import { ComponentType, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { EStatus } from '@/constants/status';
import { ROUTES } from '@/router/routes';

import { useProductsCtx } from '@/providers/products/hooks/use-products-ctx';
import { ProductsProvider } from '@/providers/products';
import { useFavouritesCtx } from '@/providers/favourites/hooks/use-favourites-ctx';
import { useProductsStore } from '@/providers/products/hooks/use-products-store';
import { useAppCtx } from '@/providers/app/hooks/use-app-ctx';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import Breadcrumbs from '@/components/other/Breadcrumbs';
import ProductList from '@/components/products/ProductList';
import ProductsPlaceholder from '@/components/products/ProductsPlaceholder';

import type { IViewFavouritesProps } from '@/views/favourites/types';
import type { IBreadcrumb } from '@/types/other/breadcrumbs';

import styles from './styles.module.scss';

const FavouritesClientView: ComponentType<IViewFavouritesProps> = () => {
  const t = useTranslations();
  const routePath = useRoutePath();

  const title = t('view_catalog.title_favourites');

  const { getProducts } = useProductsCtx();
  const productsData = useProductsStore(s => s.data);
  const getProductsStatus = useProductsStore(s => s.getStatus);
  const isProcessing = getProductsStatus === EStatus.PROCESSING || getProductsStatus === EStatus.INIT;
  const { store } = useFavouritesCtx();
  const { subscribe } = useAppCtx();

  const breadcrumbs: IBreadcrumb[] = [
    {
      label: t('common_breadcrumbs.home'),
      path: routePath(ROUTES.HOME),
    },
    {
      label: t('common_breadcrumbs.favourites'),
      path: routePath(ROUTES.FAVOURITES),
    },
  ];

  useEffect(() => {
    subscribe(() => {
      const favouriteIds = store.getState().productIds;
      getProducts({ productIds: favouriteIds, itemsPerPage: 9999 });
    });
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1>
          {title}
        </h1>
        {(productsData?.items?.length || isProcessing) ? (
          <ProductList
            className={styles.list}
            products={productsData?.items}
            isProcessing={isProcessing}
          />
        ) : <ProductsPlaceholder />}
      </div>
    </main>
  )
}

const FavouritesPageWrapper: ComponentType<IViewFavouritesProps> = (props) => {
  return (
    <ProductsProvider>
      <FavouritesClientView {...props} />
    </ProductsProvider>
  )
}

export default FavouritesPageWrapper;
