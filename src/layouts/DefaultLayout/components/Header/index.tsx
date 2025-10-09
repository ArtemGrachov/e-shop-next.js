import { ComponentType } from 'react';
import Link from 'next/link';

import ProductSearch from '@/components/products/ProductSearch';
import ThemeSwitch from '@/components/other/ThemeSwitch';
import CartToggle from '@/components/cart/CartToggle';

import styles from './styles.module.scss';

const Header: ComponentType = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.home}>
          E-Shop
        </Link>
        <ProductSearch />
        <ThemeSwitch />
        <CartToggle />
      </div>
    </header>
  )
}

export default Header;

