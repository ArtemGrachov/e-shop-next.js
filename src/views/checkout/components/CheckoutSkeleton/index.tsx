import { ComponentType } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

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
