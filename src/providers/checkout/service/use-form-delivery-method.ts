import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { EDeliveryMethodTypes } from '@/constants/delivery-methods';

import { useCartCtx } from '@/providers/cart/hooks/use-cart-ctx';
import { usePickUpPointsCtx } from '@/providers/pick-up-points/hooks/use-pick-up-points-ctx';
import { useDeliveryMethodsStore } from '@/providers/delivery-methods/hooks/use-delivery-methods-store';

import type { IFormDeliveryMethod } from '@/types/forms/form-delivery-method';

import { updateOrder } from '@/utils/orders/update-order';

export const useFormDeliveryMethod = () => {
  const { store, setOrder } = useCartCtx();
  const { store: pickUpPointsStore } = usePickUpPointsCtx();
  const deliveryMethods = useDeliveryMethodsStore(s => s.deliveryMethods);
  const form = useForm<IFormDeliveryMethod>({ mode: 'onTouched' });

  const deliveryMethodInput = form.register('deliveryMethodId', { required: true });

  const deliveryMethodId = form.watch('deliveryMethodId');

  const selectedDeliveryMethod = useMemo(() => {
    return deliveryMethods.find(dM => dM.id === deliveryMethodId);
  }, [deliveryMethodId, deliveryMethods]);

  const pickUpPointInput = form.register(
    'pickUpPointId',
    {
      validate: {
        required: v => {
          return selectedDeliveryMethod?.type === EDeliveryMethodTypes.PICK_UP_POINT ? !!v : true;
        },
      },
    },
  );

  const init = () => {
    const order = store.getState().order;
    const deliveryMethodId = order?.deliveryMethodId;
    const pickUpPointId = order?.pickUpPointId;

    if (!deliveryMethodId) {
      return;
    }

    form.reset({ deliveryMethodId, pickUpPointId });
    form.trigger();
  };

  const submit = () => {
    const order = store.getState().order;

    if (!order) {
      return;
    }

    const { deliveryMethodId, pickUpPointId } = form.getValues();

    order.deliveryMethodId = deliveryMethodId;
    order.deliveryMethod = selectedDeliveryMethod;

    if (selectedDeliveryMethod?.type === EDeliveryMethodTypes.PICK_UP_POINT) {
      order.pickUpPointId = pickUpPointId;

      if (pickUpPointId) {
        const pickUpPoints = pickUpPointsStore.getState().pickUpPoints;
        const pickUpPoint = pickUpPoints.find(p => p.id === pickUpPointId);

        order.pickUpPoint = pickUpPoint;
      }
    } else {
      order.pickUpPointId = null;
      order.pickUpPoint = null;
    }

    updateOrder(order);
    setOrder({ ...order });
  }

  return {
    form,
    deliveryMethodInput,
    pickUpPointInput,
    submit,
    init,
  };
}
