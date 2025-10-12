'use client'

import { ComponentType } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { List } from 'react-bootstrap-icons';

import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';

import ProductSearch from '@/components/products/ProductSearch';
import ThemeSwitch from '@/components/other/ThemeSwitch';
import CartLink from '@/components/cart/CartLink';
import ModalNav from '@/components/modal/ModalNav';
import IconButton from '@/components/buttons/IconButton';
import FavouritesLink from '@/components/favourites/FavouritesLink';

import styles from './styles.module.scss';

const Header: ComponentType = () => {
  const { openModal } = useModalsCtx();

  const mobileNavHandler = () => {
    openModal({
      component: ModalNav,
    });
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={clsx(styles.cell, styles._mobileNav)}>
          <IconButton className={styles.mobileNav} type="button" onClick={mobileNavHandler}>
            <List size={42} />
          </IconButton>
        </div>
        <div className={clsx(styles.cell, styles._home)}>
          <Link href="/" className={styles.home}>
            E-Shop
          </Link>
        </div>
        <div className={clsx(styles.cell, styles._center)}>
          <ProductSearch className={styles.productSearch} />
        </div>
        <div className={clsx(styles.cell, styles._right)}>
          <ThemeSwitch />
          <FavouritesLink className={styles.favouritesLink} />
          <CartLink />
        </div>
      </div>
    </header>
  )
}

export default Header;

