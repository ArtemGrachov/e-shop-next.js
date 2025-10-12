'use client';

import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import { EErrorView } from '@/views/error/constants';

import Button from '@/components/buttons/Button';

import styles from './styles.module.scss';

interface IProps {
  pageType: EErrorView
}

const ErrorView: ComponentType<IProps> = ({ pageType }) => {
  const t = useTranslations();

  let title;

  switch (pageType) {
    case EErrorView.NOT_FOUND: {
      title = t('view_error.not_found_title');
      break;
    }
    default: {
      title = t('view_error.any_title');
      break;
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.error}>
        <h1 className={styles.title}>
          {title}
        </h1>
        <Button href="/" className={styles.button} tag={'Link'} variant={'primary'}>
          {t('view_error.return')}
        </Button>
      </div>
    </main>
  )
}

export default ErrorView;
