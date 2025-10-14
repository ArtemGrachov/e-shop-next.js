'use client';

import { ComponentType } from 'react';

import { useMenuCtx } from '@/providers/menu/hooks/use-menu-ctx';

import Nav from '@/components/nav/Nav';
import ModalFullscreen from '@/components/modal/ModalFullscreen';
import ModalHeader from '@/components/modal/ModalHeader';
import ProductSearch from '@/components/products/ProductSearch';
import FavouritesLink from '@/components/favourites/FavouritesLink';
import LanguageSwitch from '@/components/language/LanguageSwitch';

import type { IModalProps } from '@/providers/modals/types';

import styles from './styles.module.scss';

const ModalNav: ComponentType<IModalProps> = (props) => {
  const menu = useMenuCtx();

  return (
    <ModalFullscreen {...props}>
      <ModalHeader {...props}>
        <ProductSearch className={styles.productSearch} onSubmit={props.close} />
        <FavouritesLink className={styles.favouritesLink} onClick={props.close} />
      </ModalHeader>
      <div className={styles.content}>
        <Nav menu={menu} onClick={props.close} />
      </div>
      <footer className={styles.footer}>
        <LanguageSwitch className={styles.languageSwitch} />
      </footer>
    </ModalFullscreen>
  )
}

export default ModalNav;
