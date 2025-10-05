export interface IPagination<T> {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  items: T[];
}
