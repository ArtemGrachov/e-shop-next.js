'use client'

import { ComponentType, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import InnerImageZoom from 'inner-image-zoom';
import clsx from 'clsx';
import { Search } from 'react-bootstrap-icons';

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

const Gallery: ComponentType<IPropsWithClassName & IProps> = ({ className }) => {
  const media = [1, 2, 3, 4, 5];

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
        {media.map((m, i) => {
          return (
            <SwiperSlide key={i} className={styles.slide}>
              <img src="https://placehold.co/1600x800" alt={m.toString()} className={styles.image} />
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
