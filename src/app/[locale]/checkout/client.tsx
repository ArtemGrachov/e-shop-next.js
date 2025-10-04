'use client';

import { ComponentType } from 'react';

import { EStatus } from '@/constants/status';

import { DeliveryMethodsProvider } from '@/providers/delivery-methods';
import { PaymentMethodsProvider } from '@/providers/payment-methods';
import { CheckoutProvider } from '@/providers/checkout';

import { useCartItems } from '@/hooks/cart/cart-items';

import CartList from '@/components/cart/CartList';
import FormDeliveryAddress from '@/components/checkout/FormDeliveryAddress';
import FormPaymentsMethod from '@/components/checkout/FormPaymentsMethod';
import CheckoutDelivery from '@/components/checkout/CheckoutDelivery';
import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';

const CheckoutPageClient: ComponentType = () => {
  const cartItems = useCartItems();
  const { status } = useCheckoutCtx();

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Items</h2>
      {status === EStatus.SUCCESS ? (
        <>
          <CartList orderItems={cartItems} />
          <hr />
          <CheckoutDelivery />
          <hr />
          <FormDeliveryAddress />
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
