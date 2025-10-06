'use client';

import { ComponentType } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import FilterRange from '@/components/filters/FilterRange';

import type { IProductFilters } from '@/types/api/products';

interface IProps {
  filters: IProductFilters;
}

const ProductFilters: ComponentType<IProps> = ({ filters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (query: Record<string, string>) => {
    const newQuery = {
      ...Object.fromEntries(searchParams),
      ...query,
    };

    const newSearchParams = new URLSearchParams(newQuery);

    router.push(`?${newSearchParams.toString()}`);
  }

  const handleRangeFilter = (key: string, value: [number, number]) => {
    const query = {
      [`${key}[min]`]: value[0].toString(),
      [`${key}[max]`]: value[1].toString(),
    }

    handleFilter(query);
  }

  return (
    <div style={{ width: 300, padding: 20 }}>
      <FilterRange
        max={filters.price.max}
        min={filters.price.min}
        onChange={value => handleRangeFilter('price', value)}
      />
    </div>
  )
}

export default ProductFilters;
