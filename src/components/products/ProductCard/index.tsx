import { ComponentType, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { pathcat } from 'pathcat';

import { ROUTES } from '@/router/routes';

import type { IProduct } from '@/types/models/product';

interface IProps {
  product: IProduct;
}

const ProductCard: ComponentType<IProps> = ({ product }) => {
  const locale = useLocale();

  const href = useMemo(() => {
    return pathcat('/', ROUTES.PRODUCT, { slugId: `${product.slug[locale]}-${product.id}` });
  }, [product]);

  return (
    <article>
      <h3>
        <Link href={href}>
          {product.name[locale]}
        </Link>
      </h3>
    </article>
  )
}

export default ProductCard;
