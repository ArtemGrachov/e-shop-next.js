import { useMemo } from 'react';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';

export const useProductInCart = (product: IProduct, productVariant?: IProductVariant) => {
  const orderItems = useCartStore(s => s.orderItems);

  const orderItem = useMemo(() => {
    return orderItems.find(orderItem => orderItem.productId == product.id && orderItem.productVariantId == productVariant?.id);
  }, [orderItems, product, productVariant]);

  return {
    orderItem,
  };
}
