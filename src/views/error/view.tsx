'use client';

import { ComponentType } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { EErrorView } from '@/views/error/constants';

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
    <div>
      <h1>
        {title}
      </h1>
      <Link href="/">
        {t('view_error.return')}
      </Link>
    </div>
  )
}

export default ErrorView;
