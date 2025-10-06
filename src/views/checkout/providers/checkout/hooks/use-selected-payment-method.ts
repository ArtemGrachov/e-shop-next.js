import { useMemo } from 'react';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store'
import { usePaymentMethodsStore } from '@/views/checkout/providers/payment-methods/hooks/use-payment-methods-store';

export const useSelectedPaymentMethod = () => {
  const order = useCartStore(s => s.order);
  const paymentMethods = usePaymentMethodsStore(s => s.paymentMethods);

  const selectedPaymentMethod = useMemo(() => {
    return paymentMethods.find(paymentMethod => paymentMethod.id === order?.paymentMethodId);
  }, [order]);

  return selectedPaymentMethod;
}
