import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'use-intl';

import { useDeliveryMethodsStore } from '@/providers/delivery-methods/hooks/use-delivery-methods-store';
import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';

import FieldClientErrors from '@/components/forms/FieldClientErrors';

const FormDeliveryMethod: ComponentType = () => {
  const locale = useLocale();
  const t = useTranslations();
  const deliveryMethods = useDeliveryMethodsStore(s => s.deliveryMethods);
  const { formDeliveryMethod } = useCheckoutCtx();
  const { deliveryMethodInput, form } = formDeliveryMethod;
  const errors = form.formState.errors;

  const deliveryMethodOptions = useMemo(() => {
    return deliveryMethods.map(deliveryMethod => ({
      name: deliveryMethod.name[locale],
      description: deliveryMethod.description[locale],
      id: deliveryMethod.id,
    }))
  }, [deliveryMethods]);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <label htmlFor="deliveryMethod">
          {t('form_delivery_method.delivery_method')}
        </label>
        <select id="deliveryMethod" {...deliveryMethodInput}>
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
    </form>
  )
}

export default FormDeliveryMethod;
