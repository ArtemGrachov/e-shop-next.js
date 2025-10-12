'use client';

import { ComponentType } from 'react';

import Nav from '@/components/nav/Nav';
import ModalFullscreen from '@/components/modal/ModalFullscreen';
import ModalHeader from '@/components/modal/ModalHeader';
import ProductSearch from '@/components/products/ProductSearch';
import FavouritesLink from '@/components/favourites/FavouritesLink';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';

const ModalNav: ComponentType<IModalProps> = (props) => {
  return (
    <ModalFullscreen {...props}>
      <ModalHeader {...props}>
        <ProductSearch className={styles.productSearch} />
        <FavouritesLink className={styles.favouritesLink} />
      </ModalHeader>
      <div className={styles.content}>
        <Nav />
      </div>
    </ModalFullscreen>
  )
}

export default ModalNav;
