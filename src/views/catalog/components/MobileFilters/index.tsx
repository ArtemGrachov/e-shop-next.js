'use client'

import { ComponentType, lazy } from 'react';
import { useTranslations } from 'next-intl';
import { Filter } from 'react-bootstrap-icons';

import { useModalsCtx } from '@/providers/modals/hooks/use-modals-ctx';

import { getPageData } from '../../server';

import styles from './styles.module.scss';
import Button from '@/components/buttons/Button';

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
    <Button type="button" className={styles.filtersButton} onClick={mobileFiltersHadler}>
      <Filter size={24} />
      {t('view_catalog.mobile_filters.filters')}
    </Button>
  )
}

export default MobileFilters;
