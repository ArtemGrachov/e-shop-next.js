
'use client';

import { ComponentType } from 'react';

import styles from './styles.module.scss';

const ProductCardSkeleton: ComponentType = () => {
  return (
    <div className={styles.productCard}>
      <div className={styles.image}>
        <div className={styles.imageSkeleton}></div>
      </div>
      <div className={styles.nameSkeleton}></div>
      <div className={styles.priceSkeleton}></div>
      <div className={styles.cartSkeleton}></div>
    </div>
  )
}

export default ProductCardSkeleton;
