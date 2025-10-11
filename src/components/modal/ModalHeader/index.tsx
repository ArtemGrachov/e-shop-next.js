import { ComponentType } from 'react';
import { X } from 'react-bootstrap-icons';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';

const ModalHeader: ComponentType<IModalProps> = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button type="button" className={styles.close} onClick={props.close}>
          <X size={42} />
        </button>
      </div>
    </header>
  )
}

export default ModalHeader;
