'use client';

import { ComponentType } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import FilterRange from '@/components/filters/FilterRange';
import FormField from '@/components/forms/FormField';

import type { IProductFilters } from '@/types/api/products';
import type { IFilterRange } from '@/types/models/filter';

interface IProps {
  filters: IProductFilters;
}

const ProductFilters: ComponentType<IProps> = ({ filters }) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (query: Record<string, string | null>) => {
    const newQuery = {
      ...Object.fromEntries(searchParams),
      ...query,
    };

    const outputQuery = Object.entries(newQuery).reduce((acc, [currKey, currValue]) => {
      if (currValue != null) {
        acc[currKey] = currValue;
      }
      return acc;
    }, {} as Record<string, string>);

    const newSearchParams = new URLSearchParams(outputQuery);

    router.push(`?${newSearchParams.toString()}`);
  }

  const handleRangeFilter = (key: string, value: [number, number], filter: IFilterRange) => {
    const min = value[0];
    const max = value[1];

    const minKey = `${key}[min]`;
    const maxKey = `${key}[max]`;

    const query: Record<string, string | null> = {};

    if (min !== filter.rangeMin) {
      query[minKey] = value[0].toString();
    } else {
      query[minKey] = null;
    }
    
    if (max !== filter.rangeMax) {
      query[maxKey] = value[1].toString();
    } else {
      query[maxKey] = null;
    }


    handleFilter(query);
  }

  return (
    <FormField label={t('product_filters.price')}>
      <FilterRange
        max={filters.price.rangeMax}
        min={filters.price.rangeMin}
        value={[filters.price.valueMin, filters.price.valueMax]}
        onChange={value => handleRangeFilter('price', value, filters.price)}
      />
    </FormField>
  )
}

export default ProductFilters;
