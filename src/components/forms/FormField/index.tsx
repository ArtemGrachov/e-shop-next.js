import { ComponentType, PropsWithChildren, ReactNode } from 'react';

import styles from './styles.module.scss';

interface IProps {
  htmlFor?: string;
  label?: ReactNode;
}

const FormField: ComponentType<PropsWithChildren & IProps> = ({ children, htmlFor, label }) => {
  return (
    <div className={styles.formField}>
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
