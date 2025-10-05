import { ChangeEventHandler, ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'use-intl';

import { EDeliveryMethodTypes } from '@/constants/delivery-methods';

import { useDeliveryMethodsStore } from '@/providers/delivery-methods/hooks/use-delivery-methods-store';
import { usePickUpPointsStore } from '@/providers/pick-up-points/hooks/use-pick-up-points-store';
import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';
import { usePickUpPointsCtx } from '@/providers/pick-up-points/hooks/use-pick-up-points-ctx';

import FieldClientErrors from '@/components/forms/FieldClientErrors';

interface IProps {
  onSubmitSuccess?: Function;
}

const FormDeliveryMethod: ComponentType<IProps> = ({ onSubmitSuccess }) => {
  const locale = useLocale();
  const t = useTranslations();

  const { formDeliveryMethod } = useCheckoutCtx();
  const { getPickUpPoints } = usePickUpPointsCtx();

  const deliveryMethods = useDeliveryMethodsStore(s => s.deliveryMethods);
  const pickUpPoints = usePickUpPointsStore(s => s.pickUpPoints);

  const { deliveryMethodInput, pickUpPointInput, form, submit } = formDeliveryMethod;
  const errors = form.formState.errors;

  const deliveryMethodId = form.watch('deliveryMethodId');

  const deliveryMethodOptions = useMemo(() => {
    return deliveryMethods.map(deliveryMethod => ({
      name: deliveryMethod.name[locale],
      description: deliveryMethod.description[locale],
      id: deliveryMethod.id,
    }))
  }, [deliveryMethods]);

  const pickUpPoinsOptions = useMemo(() => {
    return pickUpPoints.map(pickUpPoint => ({
      name: pickUpPoint.name,
      openingHours: pickUpPoint.openingHours,
      id: pickUpPoint.id,
    }))
  }, [pickUpPoints]);

  const submitHandler = () => {
    submit();
    onSubmitSuccess && onSubmitSuccess();
  }

  const showPickUpSelection = useMemo(() => {
    const deliveryMethod = deliveryMethods.find(dM => dM.id === deliveryMethodId);

    return deliveryMethod?.type === EDeliveryMethodTypes.PICK_UP_POINT;
  }, [deliveryMethodId]);

  const deliveryMethodChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    deliveryMethodInput.onChange(e);
    const deliveryMethodId = form.getValues().deliveryMethodId;
    const deliveryMethod = deliveryMethods.find(dM => dM.id === deliveryMethodId);

    if (!deliveryMethodId || !deliveryMethod) {
      return;
    }

    if (deliveryMethod?.type === EDeliveryMethodTypes.PICK_UP_POINT) {
      getPickUpPoints(deliveryMethodId);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <div>
        <label htmlFor="deliveryMethod">
          {t('form_delivery_method.delivery_method')}
        </label>
        <select id="deliveryMethod" {...deliveryMethodInput} onChange={deliveryMethodChangeHandler}>
          <option value="">-</option>
          {deliveryMethodOptions.map(option => {
            return (
              <option key={option.id} value={option.id}>
                {option.name} {' '} | {' '}
                {option.description}
              </option>
            )
          })}
        </select>
        <FieldClientErrors error={errors.deliveryMethodId} />
      </div>
      {showPickUpSelection && <div>
        <label htmlFor="pickUpPoint">
          {t('form_delivery_method.pick_up_point')}
        </label>
        <select id="pickUpPoint" {...pickUpPointInput}>
          <option value="">-</option>
          {pickUpPoinsOptions.map(option => {
            return (
              <option key={option.id} value={option.id}>
                {option.name} {' '} | {' '}
                {option.openingHours}
              </option>
            )
          })}
        </select>
        <FieldClientErrors error={errors.pickUpPointId} />
      </div>}
      <button type="submit">
        {t('form_delivery_method.submit')}
      </button>
    </form>
  )
}

export default FormDeliveryMethod;
