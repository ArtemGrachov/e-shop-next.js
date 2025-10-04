import { ComponentType } from 'react';
import { useLocale } from 'next-intl';

import type { IPaymentMethod } from '@/types/models/payment-method';

interface IProps {
  paymentMethod: IPaymentMethod;
}

const PaymentMethod: ComponentType<IProps> = ({ paymentMethod: paymentMethod }) => {
  const locale = useLocale();

  const description = paymentMethod.description[locale];

  return (
    <div>
      <h3>
        {paymentMethod.name[locale]}
      </h3>
      {description && <p>
        {description}
      </p>}
    </div>
  )
}

export default PaymentMethod;
