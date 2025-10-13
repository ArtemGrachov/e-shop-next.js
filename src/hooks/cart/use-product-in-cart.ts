import { useMemo } from 'react';

import { useCartItems } from '@/hooks/cart/use-cart-items';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';

export const useProductInCart = (product: IProduct, productVariant?: IProductVariant) => {
  const cartItems = useCartItems();

  const orderItem = useMemo(() => {
    return cartItems.find(orderItem => orderItem.productId == product.id && orderItem.productVariantId == productVariant?.id);
  }, [cartItems, product, productVariant]);

  return {
    orderItem,
  };
}
