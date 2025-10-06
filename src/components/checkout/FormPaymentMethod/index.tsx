import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'use-intl';

import { usePaymentMethodsStore } from '@/views/checkout/providers/payment-methods/hooks/use-payment-methods-store';
import { useCheckoutCtx } from '@/views/checkout/providers/checkout/hooks/use-checkout-ctx';

import FieldClientErrors from '@/components/forms/FieldClientErrors';

interface IProps {
  onSubmitSuccess?: Function;
}

const FormPaymentMethod: ComponentType<IProps> = ({ onSubmitSuccess }) => {
  const locale = useLocale();
  const t = useTranslations();
  const paymentMethods = usePaymentMethodsStore(s => s.paymentMethods);
  const { formPaymentMethod } = useCheckoutCtx();
  const { paymentMethodInput, form, submit } = formPaymentMethod;
  const errors = form.formState.errors;

  const paymentMethodOptions = useMemo(() => {
    return paymentMethods.map(paymentMethod => ({
      name: paymentMethod.name[locale],
      description: paymentMethod.description[locale],
      id: paymentMethod.id,
    }))
  }, [paymentMethods]);

  const submitHandler = () => {
    submit();
    onSubmitSuccess && onSubmitSuccess();
  }

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <div>
        <label htmlFor="paymentMethod">
          {t('form_payment_method.payment_method')}
        </label>
        <select id="paymentMethod" {...paymentMethodInput}>
          <option value="">-</option>
          {paymentMethodOptions.map(option => {
            return (
              <option key={option.id} value={option.id}>
                {option.name} {' '} | {' '}
                {option.description}
              </option>
            )
          })}
        </select>
        <FieldClientErrors error={errors.paymentMethodId} />
      </div>
      <button type="submit">
        {t('form_payment_method.submit')}
      </button>
    </form>
  )
}

export default FormPaymentMethod;
