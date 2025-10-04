import { useTranslations } from 'next-intl';
import { ComponentType, useState } from 'react';

import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';

import FormDeliveryMethod from '@/components/checkout/FormDeliveryMethod';
import DeliveryMethod from '@/components/delivery/DeliveryMethod';

const CheckoutDelivery: ComponentType = () => {
  const t = useTranslations();
  const { selectedDeliveryMethod } = useCheckoutCtx();
  const [selectionActive, setSelectionActive] = useState(!selectedDeliveryMethod);

  return (
    <div>
      <h2>
        {t('checkout_delivery.title')}
      </h2>
      {selectionActive ? (
        <FormDeliveryMethod onSubmitSuccess={() => setSelectionActive(false)} />
      ) : selectedDeliveryMethod ? (
        <>
          <DeliveryMethod deliveryMethod={selectedDeliveryMethod} />
          <button type="button" onClick={() => setSelectionActive(true)}>
            {t('checkout_delivery.edit')}
          </button>
        </>
      ) : null}
    </div>
  )
}

export default CheckoutDelivery;
