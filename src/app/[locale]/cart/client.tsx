'use client';

import { ComponentType } from 'react';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';

import { useCartItems } from '@/hooks/cart/cart-items';

import CartList from '@/components/cart/CartList';
import CartSummary from '@/components/cart/CartSummary';

const CartPageClient: ComponentType = () => {
  const order = useCartStore(s => s.order);
  const cartItems = useCartItems();

  return (
    <div>
      <h1>Cart</h1>
      <CartList orderItems={cartItems} />
      {order && <CartSummary order={order} />}
    </div>
  )
}

export default CartPageClient;
