'use client'

import { ComponentType, lazy } from 'react';
import { useTranslations } from 'next-intl';

import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';

import { getPageData } from '../../server';

import styles from './styles.module.scss';

const ModalFilters = lazy(() => import('@/views/catalog/components/ModalFilters'));

interface IProps {
  data: Awaited<ReturnType<typeof getPageData>>;
}

const MobileFilters: ComponentType<IProps> = ({ data }) => {
  const t = useTranslations();
  const { openModal } = useModalsCtx();

  const mobileFiltersHadler = () => {
    openModal({
      component: ModalFilters,
      props: {
        data,
      },
    });
  }

  return (
    <button type="button" className={styles.filtersButton} onClick={mobileFiltersHadler}>
      {t('view_catalog.mobile_filters.filters')}
    </button>
  )
}

export default MobileFilters;
