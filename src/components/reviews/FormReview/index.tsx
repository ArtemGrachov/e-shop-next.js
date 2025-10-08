import { ComponentType, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { EStatus } from '@/constants/status';

import FormField from '@/components/forms/FormField';

import styles from './styles.module.scss';

export interface IFormReview {
  rate: number;
  message: string;
}

interface IProps {
  submitStatus?: EStatus;
  onSubmit?: (formValue: IFormReview) => any;
}

const FormReview: ComponentType<IProps> = ({ submitStatus, onSubmit }) => {
  const t = useTranslations();
  const { register, handleSubmit, reset } = useForm<IFormReview>({ defaultValues: { rate: 5, message: '' } });

  const rateInput = register('rate', { required: true });
  const messageInput = register('message');

  const submitHandler: SubmitHandler<IFormReview> = async (formValue) => {
    if (submitProcessing) {
      return;
    }

    try {
      await (onSubmit && onSubmit(formValue));
      reset();
    } catch (err) {
      alert(t('common_error.any'));
    }
  }

  const submitProcessing = useMemo(() => submitStatus === EStatus.PROCESSING, [submitStatus]);
  const submitError = useMemo(() => submitStatus === EStatus.ERROR, [submitStatus]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormField label={t('form_review.rate')}>
        <input
          type="number"
          min="1"
          max="5"
          {...rateInput}
          className={clsx(styles.input, styles.rate)}
          readOnly={submitProcessing}
        />
      </FormField>
      <FormField label={t('form_review.review')}>
        <textarea
          {...messageInput}
          className={clsx(styles.input, styles.message)}
          readOnly={submitProcessing}
        ></textarea>
      </FormField>
      <button type="submit" className={styles.submit} disabled={submitProcessing}>
        {t('form_review.submit')}
      </button>
      {submitError &&(
        <p>
          {t('common_error.any')}
        </p>
      )}
    </form>
  )
}

export default FormReview;
