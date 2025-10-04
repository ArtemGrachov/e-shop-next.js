import { ComponentType, useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { EDeliveryMethodTypes } from '@/constants/delivery-methods';
import { IDeliveryAddress } from '@/types/models/delivery-address';
import { IDeliveryMethod } from '@/types/models/delivery-method';

interface IProps {
  deliveryMethod: IDeliveryMethod;
  deliveryAddress: IDeliveryAddress;
}

const DeliveryAddress: ComponentType<IProps> = ({ deliveryMethod, deliveryAddress }) => {
  const t = useTranslations();

  const hasAddress = useMemo(() => {
    return deliveryMethod.type === EDeliveryMethodTypes.COURIER;
  }, [deliveryMethod]);

  return (
    <ul>
      <li>
        {t('deliery_address.name')}: {deliveryAddress.firstName} {deliveryAddress.lastName}
      </li>
      <li>
        {t('deliery_address.email')}: {deliveryAddress.email || '-'}
      </li>
      <li>
        {t('deliery_address.phone_number')}: {deliveryAddress.phoneNumber || '-'}
      </li>
      {hasAddress && (
        <>
          <li>
            {t('deliery_address.city')}: {deliveryAddress.city || '-'}
          </li>
          <li>
            {t('deliery_address.street')}: {deliveryAddress.street || '-'}
          </li>
          <li>
            {t('deliery_address.house_number')}: {deliveryAddress.houseNumber || '-'}
          </li>
          <li>
            {t('deliery_address.apartment_number')}: {deliveryAddress.apartmentNumber || '-'}
          </li>
          <li>
            {t('deliery_address.comment')}: {deliveryAddress.comment || '-'}
          </li>
        </>
      )}
    </ul>
  )
}

export default DeliveryAddress;
