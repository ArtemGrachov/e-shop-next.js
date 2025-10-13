import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { Cart } from 'react-bootstrap-icons';
import clsx from 'clsx';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import Button from '@/components/buttons/Button';

import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  externalNavigate?: boolean;
  onNavigate?: Function;
}

const CartPlaceholder: ComponentType<IProps & IPropsWithClassName> = ({ className, externalNavigate, onNavigate }) => {
  const t = useTranslations();
  const routePath = useRoutePath();

  const navigateHandler = () => {
    if (onNavigate) {
      onNavigate();
    }
  }

  return (
    <div className={clsx(styles.cartPlaceholder, className)}>
      <Cart className={styles.icon} size={72} />
      <div className={styles.title}>
        {t('cart_placeholder.title')}
      </div>
      {/* @ts-ignore */}
      <Button
        className={styles.link}
        tag={externalNavigate ? 'button' : 'Link'}
        href={externalNavigate ? undefined : routePath(ROUTES.CATALOG, { slugId: '' })}
        variant={'primary'}
        onClick={navigateHandler}
      >
        {t('cart_placeholder.link')}
      </Button>
    </div>
  )
}

export default CartPlaceholder;
