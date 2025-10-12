import { ComponentType } from 'react';
import { useLocale } from 'next-intl';

import type { IPaymentMethod } from '@/types/models/payment-method';

import styles from './styles.module.scss';

interface IProps {
  paymentMethod: IPaymentMethod;
}

const PaymentMethod: ComponentType<IProps> = ({ paymentMethod: paymentMethod }) => {
  const locale = useLocale();

  const description = paymentMethod.description[locale];

  return (
    <div>
      <div className={styles.title}>
        {paymentMethod.name[locale]}
      </div>
      {description && <p>
        {description}
      </p>}
    </div>
  )
}

export default PaymentMethod;
