import { ComponentType } from 'react';

import Price from '@/components/other/Price';

import type { IProductVariant } from '@/types/models/product-variant';
import { IProduct } from '@/types/models/product';

interface IProps {
  product: IProduct;
  productVariant?: IProductVariant;
}

const ProductPrice: ComponentType<IProps> = ({ product, productVariant }) => {
  return (
    <ul>
      {(productVariant ?? product).prices.map((price, index) => {
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
