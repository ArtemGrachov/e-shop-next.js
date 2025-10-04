import { ComponentType } from 'react';

import { EDiscountType } from '@/constants/prices';
import type { IPrice } from '@/types/models/price';

interface IProps {
  price: IPrice;
}

const Price: ComponentType<IProps> = ({ price }) => {
  return (
    <div>
      <span>
        {price.value} {price.currency}
      </span>
      {price.discount ? (
        <>
          {' '}
          <s>
            {price.originalValue} {price.currency}
          </s>
          {' '}
          <span>
          -{price.discount} {price.discountType === EDiscountType.ABSOLUTE ? price.currency : '%'}
          </span>
        </>
      ) : null}
    </div>
  )
}

export default Price;
