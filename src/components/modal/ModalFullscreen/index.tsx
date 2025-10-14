import { ComponentType, PropsWithChildren, useRef } from 'react';
import clsx from 'clsx';

import { useModalInit } from '@/hooks/modals/use-modal-init';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';

const ModalFullscreen: ComponentType<PropsWithChildren & IModalProps> = ({ children, closing }) => {
  const windowRef = useRef<HTMLDivElement | null>(null);
  useModalInit(windowRef);

  return (
    <div ref={windowRef} className={clsx(styles.modalFullscreen, closing && styles._closing)}>
      {children}
    </div>
  )
}

export default ModalFullscreen;
