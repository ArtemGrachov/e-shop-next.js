import { ComponentType } from 'react';

import ProductCard from '@/components/products/ProductCard';

import type { IProduct } from '@/types/models/product'

import styles from './styles.module.scss';

interface IProps {
  products?: IProduct[];
}

const ProductList: ComponentType<IProps> = ({ products }) => {
  products = products ?? [];

  return (
    <ul className={styles.list}>
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
