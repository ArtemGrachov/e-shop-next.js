import { ComponentType, PropsWithChildren } from 'react';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';

interface IProps {
  backdrop?: boolean;
  backdropClose?: boolean;
}

const ModalWindow: ComponentType<PropsWithChildren & IProps & IModalProps> = ({ children, backdrop, backdropClose, close }) => {
  backdropClose = backdropClose ?? true;

  return (
    <>
      {backdrop ? <div className={styles.backdrop} onClick={backdropClose ? () => close() : undefined} /> : null}
      <div className={styles.modalWindow}>
        {children}
      </div>
    </>
  )
}

export default ModalWindow;
