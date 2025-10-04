'use client';

import { ComponentType } from 'react';

import { DeliveryMethodsProvider } from '@/providers/delivery-methods';
import { PaymentMethodsProvider } from '@/providers/payment-methods';
import { CheckoutProvider } from '@/providers/checkout';
import { useCheckoutReady } from '@/providers/checkout/hooks/use-checkout-ready';

import { useCartItems } from '@/hooks/cart/cart-items';

import CartList from '@/components/cart/CartList';
import FormPaymentsMethod from '@/components/checkout/FormPaymentsMethod';
import CheckoutDelivery from '@/components/checkout/CheckoutDelivery';

const CheckoutPageClient: ComponentType = () => {
  const cartItems = useCartItems();
  const isReady = useCheckoutReady();

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Items</h2>
      {isReady ? (
        <>
          <CartList orderItems={cartItems} />
          <hr />
          <CheckoutDelivery />
          <hr />
          <h2>Payment method</h2>
          <FormPaymentsMethod />
        </>
      ) : '...'}
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
