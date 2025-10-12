import { IFilterRange } from '@/types/models/filter';
import { IPagination } from '@/types/models/pagination';
import { IProduct } from '@/types/models/product';

export interface IProductFilters {
  price: IFilterRange;
}

export interface IProductsResponse {
  pagination: IPagination;
  items: IProduct[];
  filters: IProductFilters;
}

export interface IProductsQuery {
  page?: number | string | null;
  itemsPerPage?: number | string | null;
  'price[min]'?: number | string | null;
  'price[max]'?: number | string | null;
  categoryId?: number | string | null;
  search?: number | string | null;
  productIds?: Array<string | number>;
}
