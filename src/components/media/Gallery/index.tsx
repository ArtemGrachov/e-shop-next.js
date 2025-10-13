'use client'

import { ComponentType } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { IPropsWithClassName } from '@/types/other/component-props';
import type { IMedia } from '@/types/models/media';

import 'swiper/css';
import styles from './styles.module.scss';

interface IProps {
  media?: IMedia[]
}

const Gallery: ComponentType<IPropsWithClassName & IProps> = ({ className }) => {
  const media = [1, 2, 3, 4, 5];

  return (
    <div className={className}>
      <Swiper
        className={styles.swiper}
        spaceBetween={50}
      >
        {media.map((m, i) => {
          return (
            <SwiperSlide key={i} className={styles.slide}>
              <img src="https://placehold.co/600x400" alt={m.toString()} className={styles.image} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Gallery;
