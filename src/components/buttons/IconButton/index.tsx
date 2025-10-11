import { ComponentType, useMemo } from 'react';
import clsx from 'clsx';

import BaseButton, { BaseButtonProps } from '@/components/buttons/BaseButton';

import styles from './styles.module.scss';

type ButtonSize = 'default' | 'small';

interface IProps {
  size?: ButtonSize;
}

const IconButton: ComponentType<IProps & BaseButtonProps> = (props) => {
  const { size: size } = props;

  const buttonSizeClassName = useMemo(() => {
    if (size === 'small') {
      return styles._small;
    }
  }, [size]);

  const className = clsx(styles.iconButton, buttonSizeClassName, props.className);

  return (
    <BaseButton {...props as any} className={className}>
      {props.children}
    </BaseButton>
  )
}

export default IconButton;
