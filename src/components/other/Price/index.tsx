import { ComponentType } from 'react';

import { EDiscountType } from '@/constants/prices';
import type { IPrice } from '@/types/models/price';
import { useShopCtx } from '@/providers/shop/hooks/use-shop-ctx';

interface IProps {
  price: IPrice;
}

const Price: ComponentType<IProps> = ({ price }) => {
  const { CURRENCY } = useShopCtx();

  return (
    <div>
      <span>
        {price.value} {CURRENCY}
      </span>
      {price.discount ? (
        <>
          {' '}
          <s>
            {price.originalValue} {CURRENCY}
          </s>
          {' '}
          <span>
          -{price.discount} {price.discountType === EDiscountType.ABSOLUTE ? CURRENCY : '%'}
          </span>
        </>
      ) : null}
    </div>
  )
}

export default Price;
