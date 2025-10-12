'use client';

import { ComponentType } from 'react';
import clsx from 'clsx';

import { EDiscountType } from '@/constants/prices';

import { useShopCtx } from '@/providers/shop/hooks/use-shop-ctx';

import type { IPrice } from '@/types/models/price';

import styles from './styles.module.scss';

interface IProps {
  price: IPrice;
}

const Price: ComponentType<IProps> = ({ price }) => {
  const { CURRENCY } = useShopCtx();

  return (
    <div className={styles.price}>
      <span className={clsx(styles.value, price.discount && styles._active)}>
        {price.value} {CURRENCY}
      </span>
      {price.discount ? (
        <>
          {' '}
          <span className={styles.original}>
            {price.originalValue} {CURRENCY}
          </span>
          {' '}
          <span className={styles.discount}>
          -{price.discount} {price.discountType === EDiscountType.ABSOLUTE ? CURRENCY : '%'}
          </span>
        </>
      ) : null}
    </div>
  )
}

export default Price;
