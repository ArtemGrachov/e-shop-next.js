import { useCheckoutCtx } from '@/views/checkout/providers/checkout/hooks/use-checkout-ctx';

export const useCheckoutValid = () => {
  const { formDeliveryMethod, formDeliveryAddress, formPaymentMethod } = useCheckoutCtx();

  const isFormDeliveryMethodValid = formDeliveryMethod.form.formState.isValid;
  const isFormDeliveryAddressValid = formDeliveryAddress.form.formState.isValid;
  const isFormPaymentMethodValid = formPaymentMethod.form.formState.isValid;

  return isFormDeliveryMethodValid && isFormDeliveryAddressValid && isFormPaymentMethodValid;
}
