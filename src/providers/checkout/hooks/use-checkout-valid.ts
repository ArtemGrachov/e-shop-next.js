import { useEffect } from 'react';

import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';

export const useCheckoutValid = () => {
  const { formDeliveryMethod, formDeliveryAddress, formPaymentMethod } = useCheckoutCtx();

  const isFormDeliveryMethodValid = formDeliveryMethod.form.formState.isValid;
  const isFormDeliveryAddressValid = formDeliveryAddress.form.formState.isValid;
  const isFormPaymentMethodValid = formPaymentMethod.form.formState.isValid;

  useEffect(() => {
    formDeliveryMethod.form.trigger();
    formDeliveryAddress.form.trigger();
    formPaymentMethod.form.trigger();
  }, [])

  return isFormDeliveryMethodValid && isFormDeliveryAddressValid && isFormPaymentMethodValid;
}
