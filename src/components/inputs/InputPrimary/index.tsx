import { ComponentType, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './styles.module.scss';

interface IProps {
  wrapperAttrs?: HTMLAttributes<HTMLDivElement>;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
  icon?: ReactNode | null;
  formControl?: UseFormRegisterReturn;
}

const InputPrimary: ComponentType<IProps> = ({ wrapperAttrs, inputAttrs, icon, formControl }) => {
  return (
    <div {...wrapperAttrs} className={clsx(styles.inputPrimary, wrapperAttrs?.className, icon && styles._withIcon)}>
      <input
        type="text"
        {...inputAttrs}
        {...formControl}
        className={clsx(styles.input, inputAttrs?.className)}
      />
      {icon && (
        <div className={styles.icon}>
          {icon}
        </div>
      )}
    </div>
  )
}

export default InputPrimary;
