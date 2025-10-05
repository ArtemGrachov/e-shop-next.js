import { ComponentType } from 'react';

import ProductCard from '@/components/products/ProductCard';

import type { IProduct } from '@/types/models/product'

interface IProps {
  products?: IProduct[];
}

const ProductList: ComponentType<IProps> = ({ products }) => {
  products = products ?? [];

  return (
    <ul>
      {products.map(product => {
        return (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        )
      })}
    </ul>
  )
}

export default ProductList;
