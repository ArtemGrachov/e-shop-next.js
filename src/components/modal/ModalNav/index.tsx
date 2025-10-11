'use client';

import { ComponentType } from 'react';
import { X } from 'react-bootstrap-icons';

import Nav from '@/components/nav/Nav';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';

const ModalNav: ComponentType<IModalProps> = ({ close }) => {
  return (
    <div className={styles.modalNav}>
      <header className={styles.header}>
        <div className={styles.container}>
          <button type="button" className={styles.close} onClick={close}>
            <X size={42} />
          </button>
        </div>
      </header>
      <div className={styles.content}>
        <Nav />
      </div>
    </div>
  )
}

export default ModalNav;
