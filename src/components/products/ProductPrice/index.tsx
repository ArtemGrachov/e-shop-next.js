import { ComponentType } from 'react';

import Price from '@/components/other/Price';

import type { IProductVariant } from '@/types/models/product-variant';

interface IProps {
  productVariant: IProductVariant;
}

const ProductPrice: ComponentType<IProps> = ({ productVariant }) => {
  return (
    <ul>
      {productVariant.prices.map((price, index) => {
        return (
          <li key={index}>
            <Price price={price} />
          </li>
        )
      })}
    </ul>
  )
}

export default ProductPrice;
