import { useForm } from 'react-hook-form';

import type { IFormDeliveryAddress } from '@/types/forms/form-delivery-address';

export const useFormDeliveryAddress = () => {
  const form = useForm<IFormDeliveryAddress>();

  const firstNameInput = form.register('firstName', { required: true });
  const lastNameInput = form.register('lastName', { required: true });
  const emailInput = form.register('email', { required: true });
  const cityInput = form.register('city', { required: true });
  const streetInput = form.register('street', { required: true });
  const houseNumberInput = form.register('houseNumber', { required: true });
  const apartmentNumberInput = form.register('apartmentNumber');
  const commentInput = form.register('comment');

  return {
    form,
    firstNameInput,
    lastNameInput,
    emailInput,
    cityInput,
    streetInput,
    houseNumberInput,
    apartmentNumberInput,
    commentInput,
  };
}
