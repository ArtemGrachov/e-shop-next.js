import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import CartPageClient from './client';

const CartView = () => {
  return <CartPageClient />;
}

export default CartView;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('common_meta.title_template', { title: t('view_cart.meta_title' )}),
  };
}
