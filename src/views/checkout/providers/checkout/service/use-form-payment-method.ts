import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

import type { IFormPaymentMethod } from '@/types/forms/form-payment-method';

export const useFormPaymentMethod = () => {
  const { store, setOrder } = useCartCtx();
  const form = useForm<IFormPaymentMethod>({ mode: 'onBlur' });
  const paymentMethodInput = form.register('paymentMethodId', { required: true });
  const hasInitialData = useRef(false);

  const init = () => {
    const order = store.getState().order;
    const paymentMethodId = order?.paymentMethodId;

    if (!paymentMethodId) {
      return;
    }

    form.reset({ paymentMethodId });
    form.trigger();
    hasInitialData.current = true;
  };

  const submit = () => {
    const order = store.getState().order;

    if (!order) {
      return;
    }

    const { paymentMethodId } = form.getValues();

    order.paymentMethodId = paymentMethodId;

    setOrder({ ...order });
  }

  return {
    form,
    paymentMethodInput,
    hasInitialData,
    init,
    submit,
  };
}
