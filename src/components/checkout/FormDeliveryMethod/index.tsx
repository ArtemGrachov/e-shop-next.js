import { ComponentType, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLocale } from 'next-intl';
import { useTranslations } from 'use-intl';

import { useDeliveryMethodsStore } from '@/providers/delivery-methods/hooks/use-delivery-methods-store';

import type { IFormDeliveryMethod } from '@/types/forms/form-delivery-method';
import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';

const FormDeliveryMethod: ComponentType = () => {
  const locale = useLocale();
  const t = useTranslations();
  const deliveryMethods = useDeliveryMethodsStore(s => s.deliveryMethods);
  const { formDeliveryMethod } = useCheckoutCtx();
  const { deliveryMethodInput } = formDeliveryMethod;

  const deliveryMethodOptions = useMemo(() => {
    return deliveryMethods.map(deliveryMethod => ({
      name: deliveryMethod.name[locale],
      description: deliveryMethod.description[locale],
      id: deliveryMethod.id,
    }))
  }, [deliveryMethods]);

  return (
    <form>
      <div>
        <label htmlFor="deliveryMethod">
          {t('form_delivery.delivery_method')}
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
      </div>
    </form>
  )
}

export default FormDeliveryMethod;
