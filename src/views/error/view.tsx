'use client';

import { ComponentType } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { EErrorView } from '@/views/error/constants';

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
      <h1 className={styles.title}>
        {title}
      </h1>
      <Link href="/" className={styles.button}>
        {t('view_error.return')}
      </Link>
    </main>
  )
}

export default ErrorView;
