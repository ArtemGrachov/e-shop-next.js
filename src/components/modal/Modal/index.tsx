'use client';

import { ComponentType, PropsWithChildren } from 'react';
import clsx from 'clsx';

import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

const Modal: ComponentType<PropsWithChildren & IPropsWithClassName> = ({ children, className }) => {
  return (
    <div className={clsx(styles.modal, className)}>
      {children}
    </div>
  )
}

export default Modal;
