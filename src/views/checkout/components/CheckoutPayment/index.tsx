import { useTranslations } from 'next-intl';
import { ComponentType, useState } from 'react';

import { useSelectedPaymentMethod } from '@/views/checkout/providers/checkout/hooks/use-selected-payment-method';

import FormPaymentMethod from '@/views/checkout/components/FormPaymentMethod';
import PaymentMethod from '@/components/payment/PaymentMethod';
import Button from '@/components/buttons/Button';
import CheckoutSection from '@/views/checkout/components/CheckoutSection';

import styles from './styles.module.scss';

const CheckoutPayment: ComponentType = () => {
  const t = useTranslations();
  const selectedPaymentMethod = useSelectedPaymentMethod();
  const [methodSelectionActive, setMethodSelectionActive] = useState(!selectedPaymentMethod);

  const methodEl = methodSelectionActive ? (
    <FormPaymentMethod onSubmitSuccess={() => setMethodSelectionActive(false)} />
  ) : selectedPaymentMethod ? (
    <>
      <PaymentMethod paymentMethod={selectedPaymentMethod} />
      <Button type="button" className={styles.edit} onClick={() => setMethodSelectionActive(true)}>
        {t('checkout_payment.edit')}
      </Button>
    </>
  ) : null;

  return (
    <CheckoutSection title={t('checkout_payment.title_method')}>
      {methodEl}
    </CheckoutSection>
  )
}

export default CheckoutPayment;
