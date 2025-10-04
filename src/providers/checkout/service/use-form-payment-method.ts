import { useForm } from 'react-hook-form';

import type { IFormPaymentMethod } from '@/types/forms/form-payment-method';

export const useFormPaymentMethod = () => {
  const form = useForm<IFormPaymentMethod>({ mode: 'onTouched' });
  const paymentMethodInput = form.register('paymentMethodId', { required: true });

  return {
    form,
    paymentMethodInput,
  };
}
