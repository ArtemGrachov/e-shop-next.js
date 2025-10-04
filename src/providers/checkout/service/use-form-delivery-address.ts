import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { EDeliveryMethodTypes } from '@/constants/delivery-methods';

import type { IFormDeliveryAddress } from '@/types/forms/form-delivery-address';
import type { IDeliveryMethod } from '@/types/models/delivery-method';

export const useFormDeliveryAddress = (selectedDeliveryMethod?: IDeliveryMethod) => {
  const form = useForm<IFormDeliveryAddress>({ mode: 'all' });

  const addressIsRequired = useMemo(() => {
    return selectedDeliveryMethod?.type === EDeliveryMethodTypes.COURIER;
  }, [selectedDeliveryMethod]);

  useEffect(() => {
    form.trigger();
  }, [addressIsRequired]);

  const conditionalRequired = (v: string) => {
    return addressIsRequired ? !!v : true
  };

  const firstNameInput = form.register('firstName', { required: 'This field is required' });
  const lastNameInput = form.register('lastName', { required: true });
  const emailInput = form.register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ });
  const phoneNumberInput = form.register('phoneNumber', { required: true });
  const cityInput = form.register('city', { validate: { required: conditionalRequired } });
  const streetInput = form.register('street', { validate: { required: conditionalRequired } });
  const houseNumberInput = form.register('houseNumber', { validate: { required: conditionalRequired } });
  const apartmentNumberInput = form.register('apartmentNumber');
  const commentInput = form.register('comment');

  return {
    form,
    firstNameInput,
    lastNameInput,
    emailInput,
    phoneNumberInput,
    cityInput,
    streetInput,
    houseNumberInput,
    apartmentNumberInput,
    commentInput,
  };
}
