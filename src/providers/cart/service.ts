import { useRef } from 'react';
import { useStore } from 'zustand';

import { CART_STORAGE_KEY } from '@/constants/cart';

import { useStorageCtx } from '@/providers/storage/hooks/use-storage-ctx';

import { EActions, type State } from './store/types';
import { createCartStore } from './store';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';
import type { IPrice } from '@/types/models/price';
import type { IOrder } from '@/types/models/order';

import { createOrder } from '@/utils/orders/create-order';
import { productToOrderItem } from '@/utils/products/product-to-order-item';
import { updateOrder } from '@/utils/orders/update-order';

/**
 * In real apps order updating and recalculation is performed on backend
 */
export const useCartService = (initialState?: State) => {
  const { getItemJSON, setItemJSON } = useStorageCtx();
  const storeRef = useRef(createCartStore(initialState));
  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const init = () => {
    const order = getItemJSON(CART_STORAGE_KEY) ?? null;
    dispatch({ type: EActions.SET, order });
    dispatch({ type: EActions.SET_INITIALIZED });
  }

  const setOrder = (order: IOrder | null) => {
    dispatch({ type: EActions.SET, order });
    setItemJSON(CART_STORAGE_KEY, order);
  }

  const forgetOrder = () => {
    removeItem(CART_STORAGE_KEY);
  }

  const addProduct = (quantity: number, price: IPrice, product: IProduct, productVariant?: IProductVariant) => {
    let order = storeRef.current.getState().order;
    const orderItem = productToOrderItem(product, quantity, price, productVariant);

    if (!order) {
      order = createOrder([orderItem]);
    } else {
      order.items = [...order.items, orderItem];
    }

    order = updateOrder(order);

    dispatch({ type: EActions.SET, order: { ...order } });
    setItemJSON(CART_STORAGE_KEY, order);
  }

  const removeItem = (itemId: string) => {
    let order = storeRef.current.getState().order;

    if (!order) {
      return;
    }

    order.items = order.items.filter(orderItem => orderItem.id !== itemId);

    order = updateOrder(order);

    dispatch({ type: EActions.SET, order: { ...order } });
    setItemJSON(CART_STORAGE_KEY, order);
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    let order = storeRef.current.getState().order;

    if (!order) {
      return;
    }

    order.items = order.items.map(orderItem => orderItem.id === itemId ? { ...orderItem, quantity } : orderItem);

    order = updateOrder(order);

    dispatch({ type: EActions.SET, order: { ...order } });
    setItemJSON(CART_STORAGE_KEY, order);
  }

  return {
    store: storeRef.current,
    init,
    addProduct,
    removeItem,
    updateQuantity,
    setOrder,
    forgetOrder,
  };
}
