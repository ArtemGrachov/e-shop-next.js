import { ComponentType, createContext, PropsWithChildren } from 'react';

import { IOptions, useCurrentVariantService } from './service';

export const CurrentVariantContext = createContext<ReturnType<typeof useCurrentVariantService>>(null as any);

interface IProps extends IOptions {}

export const CurrentVariantProvider: ComponentType<PropsWithChildren & IProps> = (props) => {
  const service = useCurrentVariantService(props);

  return (
    <CurrentVariantContext.Provider value={service}>
      {props.children}
    </CurrentVariantContext.Provider>
  )
}
