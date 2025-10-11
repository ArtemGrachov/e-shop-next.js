import { ComponentType } from 'react';
import { X } from 'react-bootstrap-icons';

import type { IModalProps } from '@/providers/modals/types';

import IconButton from '@/components/buttons/IconButton';

import styles from './styles.module.scss';

const ModalHeader: ComponentType<IModalProps> = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <IconButton type="button" onClick={props.close}>
          <X size={42} />
        </IconButton>
      </div>
    </header>
  )
}

export default ModalHeader;
