import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';

const FormDeliveryAddress: ComponentType = () => {
  const t = useTranslations();
  const { formDeliveryAddress } = useCheckoutCtx();
  const {
    firstNameInput,
    lastNameInput,
    emailInput,
    phoneNumberInput,
    cityInput,
    streetInput,
    houseNumberInput,
    apartmentNumberInput,
    commentInput,
  } = formDeliveryAddress;

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <label htmlFor="firstName">
          {t('form_delivery_address.first_name')}
        </label>
        <input id="firstName" type="text" {...firstNameInput} />
      </div>
      <div>
        <label htmlFor="lastName">
          {t('form_delivery_address.last_name')}
        </label>
        <input id="lastName" type="text" {...lastNameInput} />
      </div>
      <div>
        <label htmlFor="phoneNumber">
          {t('form_delivery_address.phone_number')}
        </label>
        <input id="phoneNumber" type="text" {...phoneNumberInput} />
      </div>
      <div>
        <label htmlFor="email">
          {t('form_delivery_address.email')}
        </label>
        <input id="email" type="text" {...emailInput} />
      </div>
      <div>
        <label htmlFor="city">
          {t('form_delivery_address.city')}
        </label>
        <input id="city" type="text" {...cityInput} />
      </div>
      <div>
        <label htmlFor="street">
          {t('form_delivery_address.street')}
        </label>
        <input id="street" type="text" {...streetInput} />
      </div>
      <div>
        <label htmlFor="houseNumber">
          {t('form_delivery_address.house_number')}
        </label>
        <input id="houseNumber" type="text" {...houseNumberInput} />
      </div>
      <div>
        <label htmlFor="apartmentNumber">
          {t('form_delivery_address.apartment_number')}
        </label>
        <input id="apartmentNumber" type="text" {...apartmentNumberInput} />
      </div>
      <div>
        <label htmlFor="comment">
          {t('form_delivery_address.comment')}
        </label>
        <textarea id="comment" {...commentInput} />
      </div>
    </form>
  )
}

export default FormDeliveryAddress;
