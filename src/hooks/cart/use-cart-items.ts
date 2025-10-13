import { useCartStore } from '@/providers/cart/hooks/use-cart-store';

export const useCartItems = () => {
  const order = useCartStore(s => s.order);
  const orderItems = order?.items ?? [];

  return orderItems;
}
