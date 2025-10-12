import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import Button from '@/components/buttons/Button';

import styles from './styles.module.scss';
import { Cart } from 'react-bootstrap-icons';

const CartPlaceholder: ComponentType = () => {
  const t = useTranslations();
  const routePath = useRoutePath();

  return (
    <div className={styles.cartPlaceholder}>
      <Cart className={styles.icon} size={72} />
      <div className={styles.title}>
        {t('cart_placeholder.title')}
      </div>
      <Button
        className={styles.link}
        tag={'Link'}
        href={routePath(ROUTES.CATALOG)}
        variant={'primary'}
      >
        {t('cart_placeholder.link')}
      </Button>
    </div>
  )
}

export default CartPlaceholder;
