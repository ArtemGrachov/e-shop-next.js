import { useTranslations } from 'next-intl';
import { ComponentType, useEffect, useState } from 'react';

import { useCheckoutCtx } from '../../providers/checkout/hooks/use-checkout-ctx';
import { useSelectedPaymentMethod } from '../../providers/checkout/hooks/use-selected-payment-method';

import PaymentMethod from '@/components/payment/PaymentMethod';
import Button from '@/components/buttons/Button';
import FormPaymentMethod from '../FormPaymentMethod';
import CheckoutSection from '../CheckoutSection';

import styles from './styles.module.scss';

const EDIT_METHOD_TOKEN = 'PAYMENT_METHOD';

const CheckoutPayment: ComponentType = () => {
  const t = useTranslations();
  const selectedPaymentMethod = useSelectedPaymentMethod();
  const [methodSelectionActive, setMethodSelectionActive] = useState(!selectedPaymentMethod);
  const { edit } = useCheckoutCtx();

  useEffect(() => {
    edit(methodSelectionActive, EDIT_METHOD_TOKEN);
  }, [methodSelectionActive]);

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
