'use client';

import { ComponentType } from 'react';

import Nav from '@/components/nav/Nav';
import ModalFullscreen from '@/components/modal/ModalFullscreen';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';
import ModalHeader from '@/components/modal/ModalHeader';

const ModalNav: ComponentType<IModalProps> = (props) => {
  return (
    <ModalFullscreen {...props}>
      <ModalHeader {...props} />
      <div className={styles.content}>
        <Nav />
      </div>
    </ModalFullscreen>
  )
}

export default ModalNav;
