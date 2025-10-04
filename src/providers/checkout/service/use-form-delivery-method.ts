import { useForm } from 'react-hook-form';

import type { IFormDeliveryMethod } from '@/types/forms/form-delivery-method';

export const useFormDeliveryMethod = () => {
  const form = useForm<IFormDeliveryMethod>({ defaultValues: { deliveryMethodId: null } })
  const deliveryMethodInput = form.register('deliveryMethodId');

  return {
    form,
    deliveryMethodInput,
  };
}
