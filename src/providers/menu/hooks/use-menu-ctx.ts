import { useContext } from 'react';

import { MenuContext } from '@/providers/menu';

export const useMenuCtx = () => useContext(MenuContext);
