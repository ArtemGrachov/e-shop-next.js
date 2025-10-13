import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { Box } from 'react-bootstrap-icons';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import Button from '@/components/buttons/Button';

import styles from './styles.module.scss';

const ProductsPlaceholder: ComponentType = () => {
  const t = useTranslations();
  const routePath = useRoutePath();

  return (
    <div className={styles.cartPlaceholder}>
      <Box className={styles.icon} size={72} />
      <div className={styles.title}>
        {t('prodcuts_placeholder.title')}
      </div>
      <Button
        className={styles.link}
        tag={'Link'}
        href={routePath(ROUTES.CATALOG, { slugId: '' })}
        variant={'primary'}
      >
        {t('prodcuts_placeholder.link')}
      </Button>
    </div>
  )
}

export default ProductsPlaceholder;
