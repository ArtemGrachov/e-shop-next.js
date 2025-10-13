import { PRODUCTS_PAGINATION } from '@/constants/products';
import type { IProductsResponse } from '@/types/api/products';
import { IProduct } from '@/types/models/product';

const data = () => import('../../data/index.json');

interface IParams {
  page?: string;
  itemsPerPage?: string;
  'price[min]'?: string;
  'price[max]'?: string;
  categoryId?: string;
  search?: string;
  productIds?: Array<string | number>;
}

export const getProducts = async (params: IParams) => {
  let page = 1;

  if (params?.page) {
    page = +params.page;
  }

  if (isNaN(page)) {
    page = 1;
  }

  if (page < 1) {
    page = 1;
  }

  let itemsPerPage = PRODUCTS_PAGINATION.ITEMS_PER_PAGE;

  if (params?.itemsPerPage) {
    const num = +params.itemsPerPage;

    if (!isNaN(num)) {
      itemsPerPage = num;
    }
  }

  let priceMin: number | null = null;
  let priceMax: number | null = null;

  if (params?.['price[min]']) {
    const num = +params['price[min]']

    if (!isNaN(num)) {
      priceMin = num;
    }
  }

  if (params?.['price[max]']) {
    const num = +params?.['price[max]']

    if (!isNaN(num)) {
      priceMax = num;
    }
  }

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;

  const categoryId = params?.categoryId;
  const search = params?.search?.toLowerCase();

  const { products: allProducts } = await data();

  let products = allProducts.filter(product => {
    if (categoryId && !product.categoryIds.some((cId: unknown) => cId == categoryId)) {
      return false;
    }

    if (search) {
      const searchIn = [
        ...Object.values(product.name).map(s => s.toLowerCase()),
        ...Object.values(product.description).map(s => s.toLowerCase()),
      ].join(' | ');

      if (!searchIn.includes(search)) {
        return false;
      }
    }

    return true;
  }) as unknown[] as IProduct[];

  if (params.productIds) {
    const set = new Set(params.productIds);
    products = products.filter(p => set.has(p.id));
  }

  const allPrices = products.reduce((acc, curr) => {
    if (curr.price?.value != null) {
      acc.push(curr.price?.value);
    }

    if (curr.variants) {
      const variantPrices = curr.variants.map(v => v.price.value);

      acc.push(...variantPrices);
    }

    return acc;
  }, [] as number[]);

  const priceRangeMin = Math.min(...allPrices, 0);
  const priceRangeMax = Math.max(...allPrices, 1);

  if (priceMin != null || priceMax != null) {
    products = allProducts.filter(product => {
      const prices = [product.price?.value, ...(product.variants ?? []).map(pV => pV.price.value)].filter(v => v != null);

      if (priceMin != null && prices.every(v => v < priceMin)) {
        return false;
      }

      if (priceMax != null && prices.every(v => v > priceMax)) {
        return false;
      }

      return true;
    }) as unknown[] as IProduct[];
  }


  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (start != null && end != null) {
    products = products.slice(start, end);
  }

  const result: IProductsResponse = {
    pagination: {
      totalItems,
      totalPages: totalPages || 1,
      currentPage: page,
      itemsPerPage,
    },
    items: products,
    filters: {
      price: {
        type: 'range',
        rangeMin: priceRangeMin,
        rangeMax: priceRangeMax,
        valueMin: priceMin ?? priceRangeMin,
        valueMax: priceMax ?? priceRangeMax,
      },
    },
  };

  return result;
}