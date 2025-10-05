import { useForm } from 'react-hook-form';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';
import { useDeliveryMethodsCtx } from '@/providers/delivery-methods/hooks/use-delivery-methods-ctx';

import type { IFormDeliveryMethod } from '@/types/forms/form-delivery-method';

import { updateOrder } from '@/utils/orders/update-order';

export const useFormDeliveryMethod = () => {
  const { store, setOrder } = useCartCtx();
  const { store: deliveryMethodsStore } = useDeliveryMethodsCtx();
  const form = useForm<IFormDeliveryMethod>({ mode: 'onTouched' });

  const deliveryMethodInput = form.register('deliveryMethodId');

  const init = () => {
    const order = store.getState().order;
    const deliveryMethodId = order?.deliveryMethodId;

    if (!deliveryMethodId) {
      return;
    }

    form.reset({ deliveryMethodId });
    form.trigger();
  };

  const submit = () => {
    const order = store.getState().order;

    if (!order) {
      return;
    }

    const { deliveryMethodId } = form.getValues();

    order.deliveryMethodId = deliveryMethodId;

    const deliveryMethods = deliveryMethodsStore.getState().deliveryMethods;
    const selectedDeliveryMethod = deliveryMethods.find(dM => dM.id === deliveryMethodId);

    order.deliveryMethod = selectedDeliveryMethod;

    updateOrder(order);
    setOrder({ ...order });
  }

  return {
    form,
    deliveryMethodInput,
    submit,
    init,
  };
}
