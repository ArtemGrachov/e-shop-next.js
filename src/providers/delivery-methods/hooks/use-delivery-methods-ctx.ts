import { useContext } from 'react';

import { DeliveryMethodsContext } from '@/providers/delivery-methods';

export const useDeliveryMethodsCtx = () => useContext(DeliveryMethodsContext);
