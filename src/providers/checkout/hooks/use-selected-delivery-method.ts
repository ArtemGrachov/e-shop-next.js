import { useMemo } from 'react';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store'
import { useDeliveryMethodsStore } from '@/providers/delivery-methods/hooks/use-delivery-methods-store';

export const useSelectedDeliveryMethod = () => {
  const order = useCartStore(s => s.order);
  const deliveryMethods = useDeliveryMethodsStore(s => s.deliveryMethods);

  const selectedDeliveryMethod = useMemo(() => {
    return deliveryMethods.find(deliveryMethod => deliveryMethod.id === order?.deliveryMethodId);
  }, [order]);

  return selectedDeliveryMethod;
}
