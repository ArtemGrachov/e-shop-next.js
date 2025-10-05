import { EOrderStatus } from '@/constants/order';

import type { IDeliveryAddress } from '@/types/models/delivery-address';
import type { IDeliveryMethod } from '@/types/models/delivery-method';
import type { IOrderItem } from '@/types/models/order-item'
import type { IOrderPrice } from '@/types/models/order-price'
import type { IPaymentMethod } from '@/types/models/payment-method';

export interface IOrder {
  id: string;
  code: string;
  items: IOrderItem[];
  price: IOrderPrice;
  deliveryMethodId?: string | null;
  deliveryMethod?: IDeliveryMethod | null;
  deliveryAddress?: IDeliveryAddress | null;
  paymentMethodId?: string | null;
  paymentMethod?: IPaymentMethod | null;
  status?: EOrderStatus;
}
