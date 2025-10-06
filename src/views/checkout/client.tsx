'use client';

import { ComponentType } from 'react';

import { PickUpPointsProvider } from '@/views/checkout/providers/pick-up-points';
import { DeliveryMethodsProvider } from '@/views/checkout/providers/delivery-methods';
import { PaymentMethodsProvider } from '@/views/checkout/providers/payment-methods';
import { CheckoutProvider } from '@/views/checkout/providers/checkout';
import { useCheckoutReady } from '@/views/checkout/providers/checkout/hooks/use-checkout-ready';
import { useCartStore } from '@/providers/cart/hooks/use-cart-store';

import { useCartItems } from '@/hooks/cart/cart-items';

import CartList from '@/components/cart/CartList';
import CheckoutDelivery from '@/components/checkout/CheckoutDelivery';
import CheckoutPayment from '@/components/checkout/CheckoutPayment';
import CheckoutSubmit from '@/components/checkout/CheckoutSubmit';

const CheckoutPageClient: ComponentType = () => {
  const cartItems = useCartItems();
  const isReady = useCheckoutReady();
  const cartOrder = useCartStore(s => s.order)

  return (
    <div>
      <h1>Checkout</h1>
      {isReady ? cartOrder ? (
        <>
          <CartList orderItems={cartItems} />
          <hr />
          <CheckoutDelivery />
          <hr />
          <CheckoutPayment />
          <hr />
          <CheckoutSubmit />
        </>
      ) : null : '...'}
    </div>
  )
}

const CheckoutPageWrapper: ComponentType = () => {
  return (
    <PickUpPointsProvider>
      <DeliveryMethodsProvider>
        <PaymentMethodsProvider>
          <CheckoutProvider>
            <CheckoutPageClient />
          </CheckoutProvider>
        </PaymentMethodsProvider>
      </DeliveryMethodsProvider>
    </PickUpPointsProvider>
  )
}

export default CheckoutPageWrapper;
