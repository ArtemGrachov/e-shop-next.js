'use client';

import { ComponentType } from 'react';

import FilterRange from '@/components/filters/FilterRange';

const ProductFilters: ComponentType = () => {
  return (
    <div style={{ width: 300, padding: 20 }}>
      <FilterRange />
    </div>
  )
}

export default ProductFilters;
