import { ComponentType } from 'react';
import clsx from 'clsx';

import BaseButton, { BaseButtonProps } from '@/components/buttons/BaseButton';

import styles from './styles.module.scss';

const InputPrimaryButton: ComponentType<BaseButtonProps> = (props) => {
  return (
    <BaseButton {...props} className={clsx(styles.inputPrimaryButton, props.className)}>
      <span className={styles.iconWrap}>
        {props.children}
      </span>
    </BaseButton>
  )
}

export default InputPrimaryButton;
