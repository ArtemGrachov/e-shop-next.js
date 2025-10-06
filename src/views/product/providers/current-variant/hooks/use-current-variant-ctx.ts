import { useContext } from 'react';
import { CurrentVariantContext } from '..';

export const useCurrentVariantCtx = () => useContext(CurrentVariantContext);
