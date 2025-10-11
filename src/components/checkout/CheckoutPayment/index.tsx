import { useTranslations } from 'next-intl';
import { ComponentType, useState } from 'react';

import { useSelectedPaymentMethod } from '@/views/checkout/providers/checkout/hooks/use-selected-payment-method';

import FormPaymentMethod from '@/components/checkout/FormPaymentMethod';
import PaymentMethod from '@/components/payment/PaymentMethod';

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
      <button type="button" className={styles.button} onClick={() => setMethodSelectionActive(true)}>
        {t('checkout_payment.edit')}
      </button>
    </>
  ) : null;

  return (
    <div>
      <h2>
        {t('checkout_payment.title_method')}
      </h2>
      {methodEl}
    </div>
  )
}

export default CheckoutPayment;
