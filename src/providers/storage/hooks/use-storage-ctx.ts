import { useContext } from 'react';
import { StorageContext } from '@/providers/storage';

export const useStorageCtx = () => {
  return useContext(StorageContext);
}