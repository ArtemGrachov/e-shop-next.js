import { ComponentType, PropsWithChildren } from 'react';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';

const ModalFullscreen: ComponentType<PropsWithChildren & IModalProps> = ({ children, close }) => {
  return (
    <div className={styles.modalFullscreen}>
      {children}
    </div>
  )
}

export default ModalFullscreen;
