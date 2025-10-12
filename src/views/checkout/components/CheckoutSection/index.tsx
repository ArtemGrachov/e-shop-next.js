import { ComponentType, PropsWithChildren, ReactNode } from 'react';

import styles from './styles.module.scss';

interface IProps {
  title: ReactNode;
}

const CheckoutSection: ComponentType<IProps & PropsWithChildren> = ({ title, children }) => {
  return (
    <div className={styles.checkoutSection}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default CheckoutSection;
