import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import type { IFormDeliveryAddress } from '@/types/forms/form-delivery-address';

const FormDeliveryAddress: ComponentType = () => {
  const t = useTranslations();
  const { register } = useForm<IFormDeliveryAddress>();

  const firstNameInput = register('firstName', { required: true });
  const lastNameInput = register('lastName', { required: true });
  const emailInput = register('email', { required: true });
  const cityInput = register('city', { required: true });
  const streetInput = register('street', { required: true });
  const houseNumberInput = register('houseNumber', { required: true });
  const apartmentNumberInput = register('apartmentNumber');
  const commentInput = register('comment');

  return (
    <form>
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
        <input id="comment" type="text" {...commentInput} />
      </div>
      <button type="submit">
        {t('form_delivery_address.submit')}
      </button>
    </form>
  )
}

export default FormDeliveryAddress;
