'use client';

import ErrorView from '@/views/error/view';
import { EErrorView } from '@/views/error/constants';

const ErrorPage = () => {
  return <ErrorView pageType={EErrorView.ANY} />
}

export default ErrorPage;
