import { ComponentType } from 'react';
import clsx from 'clsx';

import ProductCard from '@/components/products/ProductCard';
import ProductCardSkeleton from '@/components/products/ProductCardSkeleton';

import type { IProduct } from '@/types/models/product'
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  products?: IProduct[];
  isProcessing?: boolean;
}

const ProductList: ComponentType<IProps & IPropsWithClassName> = ({ className, products, isProcessing }) => {
  products = products ?? [];

  return (
    <ul className={clsx(className, styles.list)}>
      {products.map(product => {
        return (
          <li key={product.id} className={styles.item}>
            <ProductCard product={product} />
          </li>
        )
      })}
      {isProcessing ? (
        <>
          <li className={styles.item}>
            <ProductCardSkeleton />
          </li>
          <li className={styles.item}>
            <ProductCardSkeleton />
          </li>
          <li className={styles.item}>
            <ProductCardSkeleton />
          </li>
        </>
      ) : null}
    </ul>
  )
}

export default ProductList;
