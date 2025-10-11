import { ComponentType, useMemo } from 'react';
import clsx from 'clsx';

import BaseButton, { BaseButtonProps } from '@/components/buttons/BaseButton';

import styles from './styles.module.scss';

type ButtonVariant = 'default' | 'primary';

interface IProps {
  variant?: ButtonVariant;
}

const Button: ComponentType<IProps & BaseButtonProps> = (props) => {
  const { variant } = props;

  const buttonTypeClassName = useMemo(() => {
    if (variant === 'primary') {
      return styles._primary;
    }
  }, [variant]);

  const className = clsx(styles.button, buttonTypeClassName, props.className);

  return (
    <BaseButton {...props as any} className={className}>
      {props.children}
    </BaseButton>
  )
}

export default Button;
