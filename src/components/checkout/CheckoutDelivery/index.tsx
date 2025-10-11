import { useTranslations } from 'next-intl';
import { ComponentType, useMemo, useState } from 'react';

import { EDeliveryMethodTypes } from '@/constants/delivery-methods';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { useSelectedDeliveryMethod } from '@/views/checkout/providers/checkout/hooks/use-selected-delivery-method';
import { useSelectedPickUpPoint } from '@/views/checkout/providers/checkout/hooks/use-selected-pick-up-point';

import FormDeliveryMethod from '@/components/checkout/FormDeliveryMethod';
import DeliveryMethod from '@/components/delivery/DeliveryMethod';
import FormDeliveryAddress from '@/components/checkout/FormDeliveryAddress';
import DeliveryAddress from '@/components/delivery/DeliveryAddress';
import PickUpPoint from '@/components/delivery/PickUpPoint';
import Button from '@/components/buttons/Button';

const CheckoutDelivery: ComponentType = () => {
  const t = useTranslations();
  const selectedDeliveryMethod = useSelectedDeliveryMethod();
  const selectedPickUpPoint = useSelectedPickUpPoint();
  const order = useCartStore(s => s.order);
  const deliveryAddress = order?.deliveryAddress;
  const [methodSelectionActive, setMethodSelectionActive] = useState(!selectedDeliveryMethod);
  const [addressEditingActive, setAddressEditingActive] = useState(!methodSelectionActive && !deliveryAddress);

  const onMethodChange = () => {
    setMethodSelectionActive(false);
    setAddressEditingActive(true);
  }

  const isPickUpPoint = useMemo(() => {
    return selectedDeliveryMethod?.type === EDeliveryMethodTypes.PICK_UP_POINT;
  }, [selectedDeliveryMethod]);

  const addressTitle = useMemo(() => {
    switch (selectedDeliveryMethod?.type) {
      case EDeliveryMethodTypes.PICK_UP_POINT: {
        return t('checkout_delivery.title_contacts');
      }
      case EDeliveryMethodTypes.COURIER: {
        return t('checkout_delivery.title_address');
      }
      default: {
        return null;
      }
    }
  }, [selectedDeliveryMethod]);

  const methodEl = methodSelectionActive ? (
    <FormDeliveryMethod onSubmitSuccess={onMethodChange} />
  ) : selectedDeliveryMethod ? (
    <>
      <DeliveryMethod deliveryMethod={selectedDeliveryMethod} />
      {(isPickUpPoint && selectedPickUpPoint) ? <PickUpPoint pickUpPoint={selectedPickUpPoint} /> : null}
      <Button type="button" onClick={() => setMethodSelectionActive(true)}>
        {t('checkout_delivery.edit')}
      </Button>
    </>
  ) : null;

  const addressEl = selectedDeliveryMethod && !methodSelectionActive ? (
    <>
      <h2>
        {addressTitle}
      </h2>
      {addressEditingActive ? (
        <FormDeliveryAddress onSubmitSuccess={() => setAddressEditingActive(false)} />
      ) : deliveryAddress ? (
        <>
          <DeliveryAddress deliveryMethod={selectedDeliveryMethod} deliveryAddress={deliveryAddress} />
          <Button type="button" onClick={() => setAddressEditingActive(true)}>
            {t('checkout_delivery.edit')}
          </Button>
        </>
      ) : null}
    </>
  ) : null;

  return (
    <div>
      <h2>
        {t('checkout_delivery.title_method')}
      </h2>
      {methodEl}
      {addressEl}
    </div>
  )
}

export default CheckoutDelivery;
