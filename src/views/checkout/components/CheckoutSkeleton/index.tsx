import { ComponentType } from 'react';
import clsx from 'clsx';

import CheckoutSection from '@/views/checkout/components/CheckoutSection';

import styles from './styles.module.scss';

const CheckoutSkeleton: ComponentType = () => {
  return (
    <CheckoutSection title={<div className={clsx(styles.skeleton, styles._title)}></div>}>
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
    </CheckoutSection>
  )
}

export default CheckoutSkeleton;
