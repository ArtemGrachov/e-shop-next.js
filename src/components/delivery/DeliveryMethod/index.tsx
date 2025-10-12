import { ComponentType } from 'react';
import { useLocale } from 'next-intl';

import type { IDeliveryMethod } from '@/types/models/delivery-method';

import styles from './styles.module.scss';

interface IProps {
  deliveryMethod: IDeliveryMethod;
}

const DeliveryMethod: ComponentType<IProps> = ({ deliveryMethod }) => {
  const locale = useLocale();

  const description = deliveryMethod.description[locale];

  return (
    <div>
      <div className={styles.title}>
        {deliveryMethod.name[locale]}
      </div>
      {description && <p>
        {description}
      </p>}
    </div>
  )
}

export default DeliveryMethod;
