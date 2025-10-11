import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

import { ROUTES } from '@/router/routes';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import ProductPrice from '@/components/products/ProductPrice';

import type { IProduct } from '@/types/models/product';

import styles from './styles.module.scss';

interface IProps {
  product: IProduct;
}

const ProductCard: ComponentType<IProps> = ({ product }) => {
  const locale = useLocale();
  const routePath = useRoutePath();

  const href = useMemo(() => {
    return routePath(ROUTES.PRODUCT, { slugId: `${product.slug[locale]}-${product.id}` });
  }, [product]);

  return (
    <article className={styles.productCard}>
      <div className={styles.image}></div>
      <h3>
        <Link href={href} className={styles.link}>
          {product.name[locale]}
        </Link>
      </h3>
      <ProductPrice product={product} productVariant={product.variants?.[0]} />
    </article>
  )
}

export default ProductCard;
