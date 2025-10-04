import { ComponentType } from 'react';
import { useLocale } from 'next-intl';

import type { IDeliveryMethod } from '@/types/models/delivery-method';

interface IProps {
  deliveryMethod: IDeliveryMethod;
}

const DeliveryMethod: ComponentType<IProps> = ({ deliveryMethod }) => {
  const locale = useLocale();

  const description = deliveryMethod.description[locale];

  return (
    <div>
      <h3>
        {deliveryMethod.name[locale]}
      </h3>
      {description && <p>
        {description}
      </p>}
    </div>
  )
}

export default DeliveryMethod;
