import { CartContext } from '@/providers/cart'
import { useContext } from 'react'

export const useCartCtx = () => {
  return useContext(CartContext);
}
