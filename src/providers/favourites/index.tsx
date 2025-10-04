import { ComponentType, createContext, PropsWithChildren } from 'react';

import { useFavouritesService } from './service';
import type { State } from './store/types';

export const FavouritesContext = createContext<ReturnType<typeof useFavouritesService>>(null as any);

interface IProps {
  initialState?: State;
}

export const FavouritesProvider: ComponentType<PropsWithChildren & IProps> = ({ children, initialState }) => {
  const service = useFavouritesService(initialState);

  return (
    <FavouritesContext.Provider value={service}>
      {children}
    </FavouritesContext.Provider>
  )
}
