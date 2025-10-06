import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { EDeliveryMethodTypes } from '@/constants/delivery-methods';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';
import { useSelectedDeliveryMethod } from '@/views/checkout/providers/checkout/hooks/use-selected-delivery-method';

import type { IFormDeliveryAddress } from '@/types/forms/form-delivery-address';

export const useFormDeliveryAddress = () => {
  const { store, setOrder } = useCartCtx();
  const form = useForm<IFormDeliveryAddress>({ mode: 'onChange' });

  const selectedDeliveryMethod = useSelectedDeliveryMethod();

  const addressIsRequired = useMemo(() => {
    return selectedDeliveryMethod?.type === EDeliveryMethodTypes.COURIER;
  }, [selectedDeliveryMethod]);

  useEffect(() => {
    if (!form.formState.isDirty) {
      return;
    }

    form.trigger();
  }, [addressIsRequired]);

  const conditionalRequired = (v?: string | null) => {
    return addressIsRequired ? !!v : true
  };

  const firstNameInput = form.register('firstName', { required: true });
  const lastNameInput = form.register('lastName', { required: true });
  const emailInput = form.register('email', {
    required: true,
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'common_validation.email',
    },
  });
  const phoneNumberInput = form.register('phoneNumber', { required: true });
  const cityInput = form.register('city', { validate: { required: conditionalRequired } });
  const streetInput = form.register('street', { validate: { required: conditionalRequired } });
  const houseNumberInput = form.register('houseNumber', { validate: { required: conditionalRequired } });
  const apartmentNumberInput = form.register('apartmentNumber');
  const commentInput = form.register('comment');

  const init = () => {
    const order = store.getState().order;
    const deliveryAddress = order?.deliveryAddress;

    if (!deliveryAddress) {
      return;
    }

    form.reset(deliveryAddress);
    form.trigger();
  };

  const submit = () => {
    const order = store.getState().order;

    if (!order) {
      return;
    }

    const formValue = form.getValues();
    order.deliveryAddress = formValue;
    setOrder({ ...order });
  }

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
    init,
    submit,
  };
}
