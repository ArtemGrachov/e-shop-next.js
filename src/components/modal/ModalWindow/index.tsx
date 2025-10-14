import { ComponentType, PropsWithChildren, useRef } from 'react';
import clsx from 'clsx';

import type { IModalProps } from '@/providers/modals/types';
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';
import { useModalInit } from '@/hooks/modals/use-modal-init';

interface IProps {
  backdrop?: boolean;
  backdropClose?: boolean;
}

const ModalWindow: ComponentType<PropsWithChildren & IProps & IModalProps & IPropsWithClassName> = ({
  children,
  backdrop,
  backdropClose,
  className,
  closing,
  close,
}) => {
  backdropClose = backdropClose ?? true;
  const windowRef = useRef<HTMLDivElement | null>(null);

  useModalInit(windowRef);

  return (
    <>
      {backdrop ? <div className={clsx(styles.backdrop, closing && styles._closing)} onClick={backdropClose ? () => close() : undefined} /> : null}
      <div ref={windowRef} className={clsx(styles.modalWindow, className, closing && styles._closing)}>
        {children}
      </div>
    </>
  )
}

export default ModalWindow;
