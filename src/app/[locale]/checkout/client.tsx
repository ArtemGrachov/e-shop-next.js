'use client';

import { ComponentType, useEffect } from 'react';

import { DeliveryMethodsProvider } from '@/providers/delivery-methods';
import { PaymentMethodsProvider } from '@/providers/payment-methods';
import { CheckoutProvider } from '@/providers/checkout';
import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { useDeliveryMethodsCtx } from '@/providers/delivery-methods/hooks/use-delivery-methods-ctx';
import { usePaymentMethodsCtx } from '@/providers/payment-methods/hooks/use-payment-methods-ctx';

import { useCartItems } from '@/hooks/cart/cart-items';

import CartList from '@/components/cart/CartList';
import FormDeliveryMethod from '@/components/checkout/FormDeliveryMethod';
import FormDeliveryAddress from '@/components/checkout/FormDeliveryAddress';

const CheckoutPageClient: ComponentType = () => {
  const order = useCartStore(s => s.order);
  const cartItems = useCartItems();
  const { getDeliveryMethods } = useDeliveryMethodsCtx();
  const { getPaymentMethods } = usePaymentMethodsCtx();

  useEffect(() => {
    getDeliveryMethods();
    getPaymentMethods();
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
      <CartList orderItems={cartItems} />
      <FormDeliveryMethod />
      <FormDeliveryAddress />
    </div>
  )
}

const CheckoutPageWrapper: ComponentType = () => {
  return (
    <DeliveryMethodsProvider>
      <PaymentMethodsProvider>
        <CheckoutProvider>
          <CheckoutPageClient />
        </CheckoutProvider>
      </PaymentMethodsProvider>
    </DeliveryMethodsProvider>
  )
}

export default CheckoutPageWrapper;
