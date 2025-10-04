import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'use-intl';

import { usePaymentMethodsStore } from '@/providers/payment-methods/hooks/use-payment-methods-store';
import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';

const FormPaymentsMethod: ComponentType = () => {
  const locale = useLocale();
  const t = useTranslations();
  const paymentMethods = usePaymentMethodsStore(s => s.paymentMethods);
  const { formPaymentMethod } = useCheckoutCtx();
  const { paymentMethodInput } = formPaymentMethod;

  const paymentMethodOptions = useMemo(() => {
    return paymentMethods.map(paymentMethod => ({
      name: paymentMethod.name[locale],
      description: paymentMethod.description[locale],
      id: paymentMethod.id,
    }))
  }, [paymentMethods]);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <label htmlFor="paymentMethod">
          {t('form_payment_method.payment_method')}
        </label>
        <select id="paymentMethod" {...paymentMethodInput}>
          {paymentMethodOptions.map(option => {
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

export default FormPaymentsMethod;
