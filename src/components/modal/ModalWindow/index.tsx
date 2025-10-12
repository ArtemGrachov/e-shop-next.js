import { ComponentType, PropsWithChildren } from 'react';
import clsx from 'clsx';

import type { IModalProps } from '@/providers/modals/types';
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  backdrop?: boolean;
  backdropClose?: boolean;
}

const ModalWindow: ComponentType<PropsWithChildren & IProps & IModalProps & IPropsWithClassName> = ({ children, backdrop, backdropClose, className, close }) => {
  backdropClose = backdropClose ?? true;

  return (
    <>
      {backdrop ? <div className={styles.backdrop} onClick={backdropClose ? () => close() : undefined} /> : null}
      <div className={clsx(styles.modalWindow, className)}>
        {children}
      </div>
    </>
  )
}

export default ModalWindow;
