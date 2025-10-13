'use client'

import { ComponentType, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import InnerImageZoom from 'inner-image-zoom';
import clsx from 'clsx';
import { Search } from 'react-bootstrap-icons';

import DefaultImage from '@/components/media/DefaultImage';

import type { IPropsWithClassName } from '@/types/other/component-props';
import type { IMedia } from '@/types/models/media';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'inner-image-zoom/lib/styles.min.css';
import styles from './styles.module.scss';

interface IProps {
  media?: IMedia[]
}

const Gallery: ComponentType<IPropsWithClassName & IProps> = ({ className, media }) => {
  media = media ?? [];

  const initZoom = () => {
    new InnerImageZoom(`.${styles.image}`, {
      hideCloseButton: true,
      hideHint: true,
    });
  }

  useEffect(() => {
    initZoom();
  }, []);

  return (
    <div className={clsx(styles.gallery, className)}>
      <Swiper
        modules={[Navigation, Pagination]}
        className={styles.swiper}
        spaceBetween={50}
        navigation
        loop={true}
        pagination={{ clickable: true }}
      >
        {media.map((mediaItem, i) => {
          return (
            <SwiperSlide key={i} className={styles.slide}>
              <DefaultImage
                className={styles.image}
                src={mediaItem.src}
                width={500}
                height={500}
                alt={''}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className={styles.zoomIcon}>
        <Search size={'100%'} />
      </div>
    </div>
  )
}

export default Gallery;
