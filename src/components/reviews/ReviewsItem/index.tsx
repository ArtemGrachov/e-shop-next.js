import { ComponentType } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import { useTranslations } from 'next-intl';

import type { IReview } from '@/types/models/review';

import styles from './styles.module.scss';

interface IProps {
  review: IReview;
}

const ReviewsItem: ComponentType<IProps> = ({ review }) => {
  const t = useTranslations();
  return (
    <article className={styles.reviewsItem}>
      <div className={styles.rate}>
        <StarFill size={18} />
        {review.rate}
      </div>
      <p className={styles.message}>
        {review.message || t('reviews_item.placeholder')}
      </p>
    </article>
  )
}

export default ReviewsItem;
