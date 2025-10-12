import { ComponentType } from 'react';

import styles from './styles.module.scss';

const SkeletonRows: ComponentType = () => {
  return (
    <div className={styles.skeletonRows}>
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
      <div className={styles.skeleton}></div>
    </div>
  )
}

export default SkeletonRows;
