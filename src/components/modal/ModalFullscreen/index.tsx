import { ComponentType, PropsWithChildren } from 'react';
import clsx from 'clsx';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';

const ModalFullscreen: ComponentType<PropsWithChildren & IModalProps> = ({ children, closing }) => {
  return (
    <div className={clsx(styles.modalFullscreen, closing && styles._closing)}>
      {children}
    </div>
  )
}

export default ModalFullscreen;
