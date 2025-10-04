'use client';

import { ComponentType } from 'react';

import CartList from '@/components/cart/CartList';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import CartSummary from '@/components/cart/CartSummary';

const CartPageClient: ComponentType = () => {
  const cartItems = useCartStore(s => s.orderItems);

  return (
    <div>
      <h1>Cart</h1>
      <CartList orderItems={cartItems} />
      <CartSummary orderItems={cartItems} />
    </div>
  )
}

export default CartPageClient;
