import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

import { useCartModal } from '@/hooks/cart/use-cart-modal';
import { useProductInCart } from '@/hooks/cart/use-product-in-cart';

import type { IProduct } from '@/types/models/product'
import type { IProductVariant } from '@/types/models/product-variant'

export const useAddToCart = (product: IProduct, productVariant?: IProductVariant) => {
  const { addProduct, updateQuantity } = useCartCtx();
  const { orderItem } = useProductInCart(product, productVariant);
  const openCartModal = useCartModal();

  const addToCart = (quantity: number) => {
    if (orderItem) {
      handleUpdate(quantity);
    } else {
      handleAdd(quantity);
    }
  }

  const handleAdd = (quantity: number) => {
    const price = productVariant?.price ?? product?.price!;
    addProduct(quantity, price, product, productVariant);
    openCartModal();
  }

  const handleUpdate = (quantity: number) => {
    updateQuantity(orderItem!.id, quantity);
  }

  return {
    orderItem,
    addToCart,
  };
}
