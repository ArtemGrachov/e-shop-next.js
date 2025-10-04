import { useRef } from 'react';
import { useStore } from 'zustand';

import { CART_STORAGE_KEY } from '@/constants/cart';

import { useStorageCtx } from '@/providers/storage/hooks/use-storage-ctx';

import { EActions, type State } from './store/types';
import { createCartStore } from './store';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';
import type { IPrice } from '@/types/models/price';

export const useCartService = (initialState?: State) => {
  const { getItemJSON, setItemJSON } = useStorageCtx();
  const storeRef = useRef(createCartStore(initialState));
  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const init = () => {
    const orderItems = getItemJSON(CART_STORAGE_KEY) ?? [];
    dispatch({ type: EActions.INIT, orderItems });
  }

  const addProduct = (quantity: number, price: IPrice, product: IProduct, productVariant?: IProductVariant) => {
    dispatch({ type: EActions.ADD_PRODUCT, product, productVariant, quantity, price });
    const { orderItems } = storeRef.current.getState();

    setItemJSON(CART_STORAGE_KEY, orderItems);
  }

  const removeItem = (itemId: number) => {
    dispatch({ type: EActions.REMOVE_ITEM, itemId });
    const { orderItems} = storeRef.current.getState();
    setItemJSON(CART_STORAGE_KEY, orderItems);
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    dispatch({ type: EActions.UPDATE_QUANTITY, itemId, quantity });
    const { orderItems} = storeRef.current.getState();
    setItemJSON(CART_STORAGE_KEY, orderItems);
  }

  return {
    init,
    addProduct,
    removeItem,
    updateQuantity,
    store: storeRef.current,
  }
}
