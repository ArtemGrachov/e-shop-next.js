'use client';

import { ComponentType } from 'react';
import { X } from 'react-bootstrap-icons';

import Nav from '@/components/nav/Nav';
import ModalFullscreen from '@/components/modal/ModalFullscreen';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';

const ModalNav: ComponentType<IModalProps> = (props) => {
  return (
    <ModalFullscreen {...props}>
      <header className={styles.header}>
        <div className={styles.container}>
          <button type="button" className={styles.close} onClick={props.close}>
            <X size={42} />
          </button>
        </div>
      </header>
      <div className={styles.content}>
        <Nav />
      </div>
    </ModalFullscreen>
  )
}

export default ModalNav;
