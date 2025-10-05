import { EOrderStatus } from '@/constants/order';

import type { IDeliveryAddress } from '@/types/models/delivery-address';
import type { IOrderItem } from '@/types/models/order-item'
import type { IOrderPrice } from '@/types/models/order-price'

export interface IOrder {
  id: string;
  code: string;
  items: IOrderItem[];
  price: IOrderPrice;
  deliveryMethodId?: string | null;
  deliveryAddress?: IDeliveryAddress | null;
  paymentMethodId?: string | null;
  status?: EOrderStatus;
}
