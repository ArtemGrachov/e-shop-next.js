'use client'

import { ComponentType } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { List } from 'react-bootstrap-icons';

import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';

import ProductSearch from '@/components/products/ProductSearch';
import ThemeSwitch from '@/components/other/ThemeSwitch';
import CartToggle from '@/components/cart/CartToggle';
import ModalNav from '@/components/modal/ModalNav';
import IconButton from '@/components/buttons/IconButton';

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
        <IconButton className={styles.mobileNav} type="button" onClick={mobileNavHandler}>
          <List size={42} />
        </IconButton>
        <div className={styles.cell}>
          <Link href="/" className={styles.home}>
            E-Shop
          </Link>
        </div>
        <div className={clsx(styles.cell, styles._center)}>
          <ProductSearch />
        </div>
        <div className={clsx(styles.cell, styles._right)}>
          <ThemeSwitch />
          <CartToggle />
        </div>
      </div>
    </header>
  )
}

export default Header;

