import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';

import { EDeliveryMethodTypes } from '@/constants/delivery-methods';

import { useDeliveryMethodsCtx } from '@/providers/delivery-methods/hooks/use-delivery-methods-ctx';
import { usePaymentMethodsCtx } from '@/providers/payment-methods/hooks/use-payment-methods-ctx';
import { useAppCtx } from '@/providers/app/hooks/use-app-ctx';
import { createCheckoutStore } from '@/providers/checkout/store';
import { useCheckoutSubmit } from '@/providers/checkout/service/use-checkout-submit';
import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';
import { usePickUpPointsCtx } from '@/providers/pick-up-points/hooks/use-pick-up-points-ctx';

import { useFormDeliveryAddress } from './use-form-delivery-address';
import { useFormDeliveryMethod } from './use-form-delivery-method';
import { useFormPaymentMethod } from './use-form-payment-method';

import { EActions } from '../store/types';

export const useCheckoutService = () => {
  const storeRef = useRef<ReturnType<typeof createCheckoutStore>>(null)

  if (storeRef.current === null) {
    storeRef.current = createCheckoutStore();
  }

  const store = storeRef.current;

  const { store: cartStore } = useCartCtx();
  const { store: deliveryMethodsStore, getDeliveryMethods } = useDeliveryMethodsCtx();
  const { getPaymentMethods } = usePaymentMethodsCtx();
  const { getPickUpPoints } = usePickUpPointsCtx();

  const dispatch = useStore(storeRef.current, s => s.dispatch);

  const { subscribe } = useAppCtx();
  const formDeliveryMethod = useFormDeliveryMethod();
  const formDeliveryAddress = useFormDeliveryAddress();
  const formPaymentMethod = useFormPaymentMethod();
  const checkoutSubmit = useCheckoutSubmit(store, formDeliveryMethod, formDeliveryAddress, formPaymentMethod);

  const init = async () => {
    formDeliveryMethod.init();
    formDeliveryAddress.init();
    formPaymentMethod.init();

    const order = cartStore.getState().order;

    await Promise.all([
      getDeliveryMethods(),
      getPaymentMethods(),
    ]);

    const deliveryMethods = deliveryMethodsStore.getState().deliveryMethods;
    const deliveryMethod = deliveryMethods.find(dM => dM.id === order?.deliveryMethodId);

    if (order?.deliveryMethodId && deliveryMethod?.type === EDeliveryMethodTypes.PICK_UP_POINT) {
      await getPickUpPoints(order.deliveryMethodId);
    }

    dispatch({ type: EActions.INIT_SUCCESS });
  }

  useEffect(() => {
    subscribe(() => init());
  }, []);

  return {
    store,
    formDeliveryMethod,
    formDeliveryAddress,
    formPaymentMethod,
    init,
    checkoutSubmit,
  };
}
