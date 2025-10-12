'use client';

import { ComponentType, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { EStatus } from '@/constants/status';

import { useProductsCtx } from '@/providers/products/hooks/use-products-ctx';
import { ProductsProvider } from '@/providers/products';
import { useFavouritesCtx } from '@/providers/favourites/hooks/use-favourites-ctx';
import { useProductsStore } from '@/providers/products/hooks/use-products-store';

import ProductList from '@/components/products/ProductList';

import { IViewFavouritesProps } from '@/views/favourites/types';

import styles from './styles.module.scss';
import { useAppCtx } from '@/providers/app/hooks/use-app-ctx';

const FavouritesClientView: ComponentType<IViewFavouritesProps> = () => {
  const t = useTranslations();

  const title = t('view_catalog.title_favourites');

  const { getProducts } = useProductsCtx();
  const productsData = useProductsStore(s => s.data);
  const getProductsStatus = useProductsStore(s => s.getStatus);
  const isProcessing = getProductsStatus === EStatus.PROCESSING || getProductsStatus === EStatus.INIT;
  const { store } = useFavouritesCtx();
  const { subscribe } = useAppCtx();

  useEffect(() => {
    subscribe(() => {
      const favouriteIds = store.getState().productIds;
      getProducts({ productIds: favouriteIds, itemsPerPage: 9999 });
    });
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>
          {title}
        </h1>
        <ProductList
          className={styles.list}
          products={productsData?.items}
          isProcessing={isProcessing}
        />
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
