import { ComponentType } from 'react';

import styles from './styles.module.scss';

const CartItemSkeleton: ComponentType = () => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.description}>
        <div className={styles.imageWrap}>
          <div className={styles.imageSkeleton}></div>
        </div>
        <div className={styles.nameSkeleton}></div>
      </div>
      <div className={styles.priceSkeleton}></div>
      <div className={styles.counterSkeleton}></div>
      <div className={styles.removeSkeleton}></div>
    </div>
  )
}

export default CartItemSkeleton;
