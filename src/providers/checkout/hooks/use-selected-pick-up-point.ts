import { useMemo } from 'react';

import { useCartStore } from '@/providers/cart/hooks/use-cart-store'
import { usePickUpPointsStore } from '@/providers/pick-up-points/hooks/use-pick-up-points-store';

export const useSelectedPickUpPoint = () => {
  const order = useCartStore(s => s.order);
  const pickUpPoints = usePickUpPointsStore(s => s.pickUpPoints);

  const selectedPickUpPoint = useMemo(() => {
    return pickUpPoints.find(pickUpPoint => pickUpPoint.id === order?.pickUpPointId);
  }, [order]);

  return selectedPickUpPoint;
}
