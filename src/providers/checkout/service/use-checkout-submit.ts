import { useStore } from 'zustand';

import { EOrderStatus } from '@/constants/order';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { useHttpClientCtx } from '@/providers/http-client/hooks/use-http-client-ctx';
import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';

import type { createCheckoutStore } from '../store';
import type { useFormDeliveryAddress } from './use-form-delivery-address';
import type { useFormDeliveryMethod } from './use-form-delivery-method';
import type { useFormPaymentMethod } from './use-form-payment-method';

import { EActions } from '../store/types';

export const useCheckoutSubmit = (
  store: ReturnType<typeof createCheckoutStore>,
  formDeliveryMethod: ReturnType<typeof useFormDeliveryMethod>,
  formDeliveryAddress: ReturnType<typeof useFormDeliveryAddress>,
  formPaymentMethod: ReturnType<typeof useFormPaymentMethod>,
) => {
  const httpClient = useHttpClientCtx();
  const dispatch = useStore(store, s => s.dispatch);
  const order = useCartStore(s => s.order);
  const { setOrder } = useCartCtx();

  const submit = async () => {
    if (
      !order ||
      !formDeliveryMethod.form.formState.isValid ||
      !formDeliveryAddress.form.formState.isValid ||
      !formPaymentMethod.form.formState.isValid
    ) {
      return false;
    }

    try {
      dispatch({ type: EActions.SUBMIT });
      order.status = EOrderStatus.FULFILLED;
      await httpClient.post('/orders', JSON.stringify(order));
      dispatch({ type: EActions.SUBMIT_SUCCESS });
      setOrder(null);

      return true;
    } catch (err) {
      dispatch({ type: EActions.SUBMIT_ERROR });
      throw err;
    }
  }

  return {
    submit,
  };
}