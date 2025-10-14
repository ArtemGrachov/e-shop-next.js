import { IOrder } from '@/types/models/order';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const data = () => import('../../../../data/index.json');
const productsBackend = () => import('@/mock-backend/products');

const ORDER_STORAGE_KEY = 'ORDER'

export const createHttpClient = () => {
  const mockHttpClient = new AxiosMockAdapter(axios);

  mockHttpClient.onGet(/\/products\/\d+/).reply(async (config) => {
    const { url } = config;
    const id = url?.split('/').slice(-1)[0];
    const { products } = await data();

    const product = products.find(p => p.id == id);

    if (!product) {
      return [404];
    }

    return [200, product];
  });

  mockHttpClient.onPatch(/\/products\/\d+/).reply(async (config) => {
    const { url } = config;
    const id = url?.split('/').slice(-1)[0];
    const response = await data();

    const parsed = JSON.parse(config.data);

    const product = response.products.find(p => p.id == id);

    if (!product) {
      return [404];
    }

    return [200, parsed];
  });

  mockHttpClient.onGet('/products').reply(async (config) => {
    const { getProducts } = await productsBackend();
    const response = await getProducts(config.params);

    return [200, response];
  });

  mockHttpClient.onGet('/categories').reply(async () => {
    const { categories } = await data();

    return [200, categories];
  });

  mockHttpClient.onGet('/delivery-methods').reply(async () => {
    const { 'delivery-methods': deliveryMethods } = await data();

    return [200, deliveryMethods];
  });

  mockHttpClient.onGet('/payment-methods').reply(async () => {
    const { 'payment-methods': paymentMethods } = await data();

    return [200, paymentMethods];
  });

  mockHttpClient.onGet('/pick-up-points').reply(async () => {
    const { 'pick-up-points': pickUpPoints } = await data();

    return [200, pickUpPoints];
  });

  mockHttpClient.onGet(/\/orders\/[\w-]+/).reply(async (config) => {
    const { url } = config;
    const id = url?.split('/').slice(-1)[0];
    const orders = (await data()).orders as IOrder[];

    let order = orders.find(o => o.id == id);

    if (!order) {
      if (typeof sessionStorage !== 'undefined') {
        try {
          const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);

          if (raw) {
            order = JSON.parse(raw);
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }

    if (!order) {
      return [404];
    }

    return [200, order];
  });

  mockHttpClient.onPost('/orders').reply(async (config) => {
    const parsed = JSON.parse(config.data);

    // workaround for storing order data without real backend
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(ORDER_STORAGE_KEY, config.data);
    }

    return [200, parsed];
  });

  return axios;
}
