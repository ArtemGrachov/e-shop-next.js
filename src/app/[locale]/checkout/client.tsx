'use client';

import { ComponentType } from 'react';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';

import { useCartItems } from '@/hooks/cart/cart-items';

import CartList from '@/components/cart/CartList';

const CheckoutPageClient: ComponentType = () => {
  const order = useCartStore(s => s.order);
  const cartItems = useCartItems();

  return (
    <div>
      <h1>Checkout</h1>
      <CartList orderItems={cartItems} />
    </div>
  )
}

export default CheckoutPageClient;
