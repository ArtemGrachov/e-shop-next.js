import { ComponentType } from 'react';

import { IPrice } from '@/types/models/price';
import { EDiscountType } from '@/constants/prices';

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
          <span>
            -{price.discount} {price.discountType === EDiscountType.ABSOLUTE ? price.currency : '%'}
          </span>
        </>
      ) : null}
    </div>
  )
}

export default Price;
