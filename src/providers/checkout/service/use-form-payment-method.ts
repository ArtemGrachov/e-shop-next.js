import { useForm } from 'react-hook-form';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

import type { IFormPaymentMethod } from '@/types/forms/form-payment-method';

export const useFormPaymentMethod = () => {
  const { store, setOrder } = useCartCtx();
  const form = useForm<IFormPaymentMethod>({ mode: 'onTouched' });
  const paymentMethodInput = form.register('paymentMethodId', { required: true });

  const init = () => {
    const order = store.getState().order;
    const paymentMethodId = order?.paymentMethodId;

    if (paymentMethodId) {
      form.setValue('paymentMethodId', paymentMethodId);
    }
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
    init,
    submit,
  };
}
