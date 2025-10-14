import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import CheckoutPageClient from './client';

const CheckoutView = () => {
  return <CheckoutPageClient />;
}

export default CheckoutView;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('common_meta.title_template', { title: t('view_checkout.meta_title' )}),
  };
}
