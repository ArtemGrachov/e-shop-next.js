import { useTranslations } from 'next-intl';
import { ComponentType, useMemo, useState } from 'react';

import { EDeliveryMethodTypes } from '@/constants/delivery-methods';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store';
import { useSelectedDeliveryMethod } from '@/providers/checkout/hooks/use-selected-delivery-method';

import FormDeliveryMethod from '@/components/checkout/FormDeliveryMethod';
import DeliveryMethod from '@/components/delivery/DeliveryMethod';
import FormDeliveryAddress from '@/components/checkout/FormDeliveryAddress';
import DeliveryAddress from '@/components/delivery/DeliveryAddress';

const CheckoutDelivery: ComponentType = () => {
  const t = useTranslations();
  const selectedDeliveryMethod = useSelectedDeliveryMethod();
  const order = useCartStore(s => s.order);
  const deliveryAddress = order?.deliveryAddress;
  const [methodSelectionActive, setMethodSelectionActive] = useState(!selectedDeliveryMethod);
  const [addressEditingActive, setAddressEditingActive] = useState(!methodSelectionActive && !deliveryAddress);

  const onMethodChange = () => {
    setMethodSelectionActive(false);
    setAddressEditingActive(true);
  }

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
      <button type="button" onClick={() => setMethodSelectionActive(true)}>
        {t('checkout_delivery.edit')}
      </button>
    </>
  ) : null;

  const addressEl = selectedDeliveryMethod && !methodSelectionActive ? (
    <>
      <hr />
      <h2>
        {addressTitle}
      </h2>
      {addressEditingActive ? (
        <FormDeliveryAddress onSubmitSuccess={() => setAddressEditingActive(false)} />
      ) : deliveryAddress ? (
        <>
          <DeliveryAddress deliveryMethod={selectedDeliveryMethod} deliveryAddress={deliveryAddress} />
          <button type="button" onClick={() => setAddressEditingActive(true)}>
            {t('checkout_delivery.edit')}
          </button>
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
