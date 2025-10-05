import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import type { IPickUpPoint } from '@/types/models/pick-up-point';

interface IProps {
  pickUpPoint: IPickUpPoint;
}

const PickUpPoint: ComponentType<IProps> = ({ pickUpPoint }) => {
  const t = useTranslations();

  return (
    <ul>
      <li>
        <strong>
          {pickUpPoint.name}
        </strong>
      </li>
      <li>
        {t('pick_up_point.opening_hours')}: {pickUpPoint.openingHours}
      </li>
    </ul>
  )
}

export default PickUpPoint;
