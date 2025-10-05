import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'use-intl';

import { useDeliveryMethodsStore } from '@/providers/delivery-methods/hooks/use-delivery-methods-store';
import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';

import FieldClientErrors from '@/components/forms/FieldClientErrors';

interface IProps {
  onSubmitSuccess?: Function;
}

const FormDeliveryMethod: ComponentType<IProps> = ({ onSubmitSuccess }) => {
  const locale = useLocale();
  const t = useTranslations();
  const deliveryMethods = useDeliveryMethodsStore(s => s.deliveryMethods);
  const { formDeliveryMethod } = useCheckoutCtx();
  const { deliveryMethodInput, form, submit } = formDeliveryMethod;
  const errors = form.formState.errors;

  const deliveryMethodOptions = useMemo(() => {
    return deliveryMethods.map(deliveryMethod => ({
      name: deliveryMethod.name[locale],
      description: deliveryMethod.description[locale],
      id: deliveryMethod.id,
    }))
  }, [deliveryMethods]);

  const submitHandler = () => {
    submit();
    onSubmitSuccess && onSubmitSuccess();
  }

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <div>
        <label htmlFor="deliveryMethod">
          {t('form_delivery_method.delivery_method')}
        </label>
        <select id="deliveryMethod" {...deliveryMethodInput}>
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
      <button type="submit">
        {t('form_delivery_method.submit')}
      </button>
    </form>
  )
}

export default FormDeliveryMethod;
