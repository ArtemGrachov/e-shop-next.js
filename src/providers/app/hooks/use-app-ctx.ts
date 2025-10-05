import { useContext } from 'react';

import { AppContext } from '@/providers/app';

export const useAppCtx = () => useContext(AppContext);
