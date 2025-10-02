import { useMemo } from 'react';

import { useFavouritesCtx } from '@/providers/favourites/hooks/use-favourites-ctx'
import { useFavouritesStore } from '@/providers/favourites/hooks/use-favourites-store';

import type { IProduct } from '@/types/models/product';

interface IOptions {
  product: IProduct;
}

export const useFavouritesToggle = ({ product }: IOptions) => {
  const { addProduct, removeProduct } = useFavouritesCtx();
  const productIds = useFavouritesStore(s => s.productIds);

  const inFavourites = useMemo(() => {
    return productIds.includes(product.id);
  }, [productIds, product]);

  const toggleHandler = () => {
    if (inFavourites) {
      removeProduct(product);
    } else {
      addProduct(product);
    }
  }

  return {
    inFavourites,
    toggleHandler,
  };
}
