import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import { useCheckoutCtx } from '@/providers/checkout/hooks/use-checkout-ctx';

import FieldClientErrors from '@/components/forms/FieldClientErrors';

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
    form,
  } = formDeliveryAddress;

  const errors = form.formState.errors;

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <label htmlFor="firstName">
          {t('form_delivery_address.first_name')}
        </label>
        <input id="firstName" type="text" {...firstNameInput} />
        <FieldClientErrors error={errors.firstName} />
      </div>
      <div>
        <label htmlFor="lastName">
          {t('form_delivery_address.last_name')}
        </label>
        <input id="lastName" type="text" {...lastNameInput} />
        <FieldClientErrors error={errors.lastName} />
      </div>
      <div>
        <label htmlFor="phoneNumber">
          {t('form_delivery_address.phone_number')}
        </label>
        <input id="phoneNumber" type="text" {...phoneNumberInput} />
        <FieldClientErrors error={errors.phoneNumber} />
      </div>
      <div>
        <label htmlFor="email">
          {t('form_delivery_address.email')}
        </label>
        <input id="email" type="email" {...emailInput} />
        <FieldClientErrors error={errors.email} />
      </div>
      <div>
        <label htmlFor="city">
          {t('form_delivery_address.city')}
        </label>
        <input id="city" type="text" {...cityInput} />
        <FieldClientErrors error={errors.city} />
      </div>
      <div>
        <label htmlFor="street">
          {t('form_delivery_address.street')}
        </label>
        <input id="street" type="text" {...streetInput} />
        <FieldClientErrors error={errors.street} />
      </div>
      <div>
        <label htmlFor="houseNumber">
          {t('form_delivery_address.house_number')}
        </label>
        <input id="houseNumber" type="text" {...houseNumberInput} />
        <FieldClientErrors error={errors.houseNumber} />
      </div>
      <div>
        <label htmlFor="apartmentNumber">
          {t('form_delivery_address.apartment_number')}
        </label>
        <input id="apartmentNumber" type="text" {...apartmentNumberInput} />
        <FieldClientErrors error={errors.apartmentNumber} />
      </div>
      <div>
        <label htmlFor="comment">
          {t('form_delivery_address.comment')}
        </label>
        <textarea id="comment" {...commentInput} />
        <FieldClientErrors error={errors.comment} />
      </div>
    </form>
  )
}

export default FormDeliveryAddress;
