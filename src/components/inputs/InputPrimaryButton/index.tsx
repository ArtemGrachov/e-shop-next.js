import { ComponentType, HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

const InputPrimaryButton: ComponentType<HTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button {...props} className={clsx(styles.inputPrimaryButton, props.className)}>
      <span className={styles.iconWrap}>
        {props.children}
      </span>
    </button>
  )
}

export default InputPrimaryButton;
