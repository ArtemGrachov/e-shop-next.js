import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import { useCheckoutCtx } from '@/views/checkout/providers/checkout/hooks/use-checkout-ctx';

import FieldClientErrors from '@/components/forms/FieldClientErrors';
import FormField from '@/components/forms/FormField';
import Button from '@/components/buttons/Button';

import styles from './styles.module.scss';

interface IProps {
  onSubmitSuccess?: Function;
}

const FormDeliveryAddress: ComponentType<IProps> = ({ onSubmitSuccess }) => {
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
    submit,
  } = formDeliveryAddress;

  const errors = form.formState.errors;

  const submitHandler = () => {
    submit();
    onSubmitSuccess && onSubmitSuccess();
  }

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <FormField
        htmlFor="firstName"
        label={t('form_delivery_address.first_name')}
      >
        <input
          id="firstName"
          type="text"
          className={styles.input}
          {...firstNameInput}
        />
        <FieldClientErrors error={errors.firstName} />
      </FormField>
      <FormField
        htmlFor="lastName"
        label={t('form_delivery_address.last_name')}
      >
        <input
          id="lastName"
          type="text"
          className={styles.input}
          {...lastNameInput}
        />
        <FieldClientErrors error={errors.lastName} />
      </FormField>
      <FormField
        htmlFor="phoneNumber"
        label={t('form_delivery_address.phone_number')}
      >
        <input
          id="phoneNumber"
          type="text"
          className={styles.input}
          {...phoneNumberInput}
        />
        <FieldClientErrors error={errors.phoneNumber} />
      </FormField>
      <FormField
        htmlFor="email"
        label={t('form_delivery_address.email')}
      >
        <input
          id="email"
          type="email"
          className={styles.input}
          {...emailInput}
        />
        <FieldClientErrors error={errors.email} />
      </FormField>
      <FormField
        htmlFor="city"
        label={t('form_delivery_address.city')}
      >
        <input
          id="city"
          type="text"
          className={styles.input}
          {...cityInput}
        />
        <FieldClientErrors error={errors.city} />
      </FormField>
      <FormField
        htmlFor="street"
        label={t('form_delivery_address.street')}
      >
        <input
          id="street"
          type="text"
          className={styles.input}
          {...streetInput}
        />
        <FieldClientErrors error={errors.street} />
      </FormField>
      <FormField
        htmlFor="houseNumber"
        label={t('form_delivery_address.house_number')}
      >
        <input
          id="houseNumber"
          type="text"
          className={styles.input}
          {...houseNumberInput}
        />
        <FieldClientErrors error={errors.houseNumber} />
      </FormField>
      <FormField
        htmlFor="apartmentNumber"
        label={t('form_delivery_address.apartment_number')}
      >
        <input
          id="apartmentNumber"
          type="text"
          className={styles.input}
          {...apartmentNumberInput}
        />
        <FieldClientErrors error={errors.apartmentNumber} />
      </FormField>
      <FormField
        htmlFor="comment"
        label={t('form_delivery_address.comment')}
      >
        <textarea
          id="comment"
          className={styles.input}
          {...commentInput}
        />
        <FieldClientErrors error={errors.comment} />
      </FormField>
      <Button type="submit" variant={'primary'} className={styles.submit}>
        {t('form_delivery_address.submit')}
      </Button>
    </form>
  )
}

export default FormDeliveryAddress;
