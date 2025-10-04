import { useForm } from 'react-hook-form';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

import type { IFormDeliveryMethod } from '@/types/forms/form-delivery-method';

export const useFormDeliveryMethod = () => {
  const { store, setOrder } = useCartCtx();
  const form = useForm<IFormDeliveryMethod>({ mode: 'onTouched' });

  const deliveryMethodInput = form.register('deliveryMethodId');

  const init = () => {
    const order = store.getState().order;
    const deliveryMethodId = order?.deliveryMethodId;

    if (deliveryMethodId) {
      form.setValue('deliveryMethodId', deliveryMethodId);
    }
  };

  const submit = () => {
    const order = store.getState().order;

    if (!order) {
      return;
    }

    const { deliveryMethodId } = form.getValues();

    order.deliveryMethodId = deliveryMethodId;

    setOrder({ ...order });
  }

  return {
    form,
    deliveryMethodInput,
    submit,
    init,
  };
}
