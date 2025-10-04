import { useFormDeliveryAddress } from './use-form-delivery-address';
import { useFormDeliveryMethod } from './use-form-delivery-method';

export const useCheckoutService = () => {
  const formDeliveryMethod = useFormDeliveryMethod();
  const formDeliveryAddress = useFormDeliveryAddress();

  return {
    formDeliveryMethod,
    formDeliveryAddress,
  };
}
