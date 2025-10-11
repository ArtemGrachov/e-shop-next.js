import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import { EStatus } from '@/constants/status';

import Button from '@/components/buttons/Button';

import { useCheckoutCtx } from '@/views/checkout/providers/checkout/hooks/use-checkout-ctx';
import { useCheckoutValid } from '@/views/checkout/providers/checkout/hooks/use-checkout-valid';
import { useCheckoutStore } from '@/views/checkout/providers/checkout/hooks/use-checkout-store';

import styles from './styles.module.scss';

const CheckoutSubmit: ComponentType = () => {
  const t = useTranslations();
  const isValid = useCheckoutValid();
  const { checkoutSubmit } = useCheckoutCtx();

  const submitStatus = useCheckoutStore(s => s.submitStatus);
  const isError = submitStatus === EStatus.ERROR;

  const submitHandler = async () => {
    if (!isValid) {
      return;
    }

    try {
      await checkoutSubmit.submit();
    } catch (err) {
      alert(t('common_error.any'));
    }
  }

  return (
    <div>
      <h2>
        {t('checkout_submit.title')}
      </h2>
      <Button
        type="button"
        className={styles.submit}
        disabled={!isValid}
        onClick={submitHandler}
      >
        {t('checkout_submit.submit')}
      </Button>
      {isError && <p>
        {t('common_error.any')}
      </p>}
    </div>
  )
}

export default CheckoutSubmit;
