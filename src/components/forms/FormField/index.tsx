import { ComponentType, PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';

import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  htmlFor?: string;
  label?: ReactNode;
}

const FormField: ComponentType<PropsWithChildren & IProps & IPropsWithClassName> = ({ children, htmlFor, label, className }) => {
  return (
    <div className={clsx(styles.formField, className)}>
      {label &&<label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>}
      <div className={styles.input}>
        {children}
      </div>
    </div>
  )
}

export default FormField;
