'use client';

import ErrorView from '@/views/error/view';
import { EErrorView } from '@/views/error/constants';

const NotFoundPage = () => {
  return <ErrorView pageType={EErrorView.NOT_FOUND} />
}

export default NotFoundPage;
