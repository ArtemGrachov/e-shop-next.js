import { useContext } from 'react'
import { FavouritesContext } from '../';

export const useFavouritesCtx = () => {
  return useContext(FavouritesContext);
}
