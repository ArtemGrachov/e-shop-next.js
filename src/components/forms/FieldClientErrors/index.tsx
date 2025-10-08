import { useTranslations } from 'next-intl';
import { ComponentType, useMemo } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './styles.module.scss';

interface IProps {
  error?: FieldError;
}

const FieldClientErrors: ComponentType<IProps> = ({ error }) => {
  const t = useTranslations();

  const errorMessage = useMemo(() => {
    if (!error) {
      return null;
    }

    if (error?.message) {
      return t(error.message);
    }

    return t(`common_validation.${error?.type}`);
  }, [error]);

  if (!error) {
    return null;
  }

  return (
    <p className={styles.error}>
      {errorMessage}
    </p>
  )
}

export default FieldClientErrors;
