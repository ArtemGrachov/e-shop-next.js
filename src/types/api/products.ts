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