import { ComponentType, SyntheticEvent, useMemo, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';

import styles from './styles.module.scss';

import srcCamera2 from '@/assets/images/camera2.svg';

const DefaultImage: ComponentType<ImageProps> = (props) => {
  const [src, setSrc] = useState(props.src || srcCamera2);
  const [isError, setIsError] = useState(false);

  const classNames = useMemo(() => {
    const result = [props.className];

    if (isError) {
      result.push(styles.imageError);
    }

    return result;
  }, [props.className, isError])

  const errorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (props.onError) {
      props.onError(event);
    }

    setIsError(true);
    setSrc(srcCamera2);
  }

  return <Image {...props} src={src} className={clsx(classNames)} onError={errorHandler} />
}

export default DefaultImage;
