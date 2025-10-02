import { useRef } from 'react';
import { useStore } from 'zustand';

import { FAVOURITES_STORAGE_KEY } from '@/constants/favourites';

import { useStorageCtx } from '@/providers/storage/hooks/use-storage-ctx';

import { EActions, type State } from './store/types';
import { createFavouritesStore } from './store';

import type { IProduct } from '@/types/models/product';

export const useFavouritesService = (initialState?: State) => {
  const { getItemJSON, setItemJSON } = useStorageCtx();
  const storeRef = useRef(createFavouritesStore(initialState));
  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const init = () => {
    const orderItems = getItemJSON(FAVOURITES_STORAGE_KEY) ?? [];
    dispatch({ type: EActions.INIT, productIds: orderItems });
  }

  const addProduct = (product: IProduct) => {
    dispatch({ type: EActions.ADD_PRODUCT, product });
    const { productIds: orderItems } = storeRef.current.getState();

    setItemJSON(FAVOURITES_STORAGE_KEY, orderItems);
  }

  const removeProduct = (itemId: number) => {
    dispatch({ type: EActions.REMOVE_ITEM, itemId });
    const { productIds: orderItems} = storeRef.current.getState();
    setItemJSON(FAVOURITES_STORAGE_KEY, orderItems);
  }

  return {
    init,
    addProduct,
    removeProduct,
    store: storeRef.current,
  }
}
