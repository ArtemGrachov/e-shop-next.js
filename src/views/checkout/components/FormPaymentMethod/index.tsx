import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'use-intl';

import { usePaymentMethodsStore } from '@/views/checkout/providers/payment-methods/hooks/use-payment-methods-store';
import { useCheckoutCtx } from '@/views/checkout/providers/checkout/hooks/use-checkout-ctx';

import FieldClientErrors from '@/components/forms/FieldClientErrors';
import FormField from '@/components/forms/FormField';
import Button from '@/components/buttons/Button';

import styles from './styles.module.scss';

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
      <FormField
        htmlFor="paymentMethod"
        label={t('form_payment_method.payment_method')}
      >
        <select
          id="paymentMethod"
          className={styles.input}
          {...paymentMethodInput}
        >
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
      </FormField>
      <Button type="submit" className={styles.submit} variant={'primary'}>
        {t('form_payment_method.submit')}
      </Button>
    </form>
  )
}

export default FormPaymentMethod;
