import { ComponentType } from 'react';
import clsx from 'clsx';

import ProductCard from '@/components/products/ProductCard';

import type { IProduct } from '@/types/models/product'
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  products?: IProduct[];
}

const ProductList: ComponentType<IProps & IPropsWithClassName> = ({ className, products }) => {
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
    </ul>
  )
}

export default ProductList;
