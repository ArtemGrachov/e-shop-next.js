'use client';

import { ComponentType, useEffect } from 'react';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { DeliveryMethodsProvider } from '@/providers/delivery-methods';
import { useDeliveryMethodsCtx } from '@/providers/delivery-methods/hooks/use-delivery-methods-ctx';

import { useCartItems } from '@/hooks/cart/cart-items';

import CartList from '@/components/cart/CartList';
import FormDeliveryMethod from '@/components/checkout/FormDeliveryMethod';

const CheckoutPageClient: ComponentType = () => {
  const order = useCartStore(s => s.order);
  const cartItems = useCartItems();
  const { getDeliveryMethods } = useDeliveryMethodsCtx();

  useEffect(() => {
    getDeliveryMethods();
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
      <CartList orderItems={cartItems} />
      <FormDeliveryMethod />
    </div>
  )
}

const CheckoutPageWrapper: ComponentType = () => {
  return (
    <DeliveryMethodsProvider>
      <CheckoutPageClient />
    </DeliveryMethodsProvider>
  )
}

export default CheckoutPageWrapper;
