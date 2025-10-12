import { ComponentType } from 'react';

import ModalFullscreen from '@/components/modal/ModalFullscreen';
import ModalHeader from '@/components/modal/ModalHeader';
import CategoryNav from '../CategoryNav';
import ProductFilters from '../ProductFilters';

import type { IModalProps } from '@/providers/modals/types';

import { getPageData } from '../../server';

import styles from './styles.module.scss';

interface IProps {
  data: Awaited<ReturnType<typeof getPageData>>;
}

const ModalFilters: ComponentType<IModalProps & IProps> = (props) => {
  const { data } = props;
  const categories = data.categoriesResponse;
  const productsData = data.productsResponse;

  return (
    <ModalFullscreen {...props}>
      <ModalHeader {...props} />
      <div className={styles.content}>
        <CategoryNav className={styles.categoryNav} categories={categories} />
        {productsData && <ProductFilters filters={productsData.filters} />}
      </div>
    </ModalFullscreen>
  )
}

export default ModalFilters;
