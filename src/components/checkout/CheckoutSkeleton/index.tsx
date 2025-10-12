import { ComponentType } from 'react';

import styles from './styles.module.scss';
import clsx from 'clsx';

const CheckoutSkeleton: ComponentType = () => {
  return (
    <div className={styles.checkoutSkeleton}>
      <div className={clsx(styles.skeleton, styles._title)}></div>
      <div className={styles.content}>
        <div className={styles.skeleton}></div>
        <div className={styles.skeleton}></div>
        <div className={styles.skeleton}></div>
      </div>
    </div>
  )
}

export default CheckoutSkeleton;
