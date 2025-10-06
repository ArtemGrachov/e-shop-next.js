import { useStore } from 'zustand';
import { useLocale } from 'next-intl';

import { EOrderStatus } from '@/constants/order';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { useHttpClientCtx } from '@/providers/http-client/hooks/use-http-client-ctx';
import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';
import { usePaymentMethodsStore } from '@/views/checkout/providers/payment-methods/hooks/use-payment-methods-store';
import { useDeliveryMethodsStore } from '@/views/checkout/providers/delivery-methods/hooks/use-delivery-methods-store';

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
  const deliveryMethods = useDeliveryMethodsStore(s => s.deliveryMethods);
  const paymentMethods = usePaymentMethodsStore(s => s.paymentMethods);
  const locale = useLocale();

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
      const paymentMethod = paymentMethods.find(pM => pM.id === order.paymentMethodId);
      const deliveryMethod = deliveryMethods.find(dM => dM.id === order.deliveryMethodId);

      order.status = EOrderStatus.FULFILLED;
      order.paymentMethod = paymentMethod;
      order.deliveryMethod = deliveryMethod;

      await httpClient.post('/orders', JSON.stringify(order));
      dispatch({ type: EActions.SUBMIT_SUCCESS });

      setOrder(null);

      /**
       * On real projects redirect is performed according to backend response
       */
      if (paymentMethod?.hasRedirect ?? true) {
        window.location.href = `/payment.html?locale=${locale}&orderId=${order.id}`;
      }

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