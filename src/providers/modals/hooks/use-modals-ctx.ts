import { useContext } from 'react';

import { ModalsContext } from '@/providers/modals';

export const useModalsCtx = () => useContext(ModalsContext);
