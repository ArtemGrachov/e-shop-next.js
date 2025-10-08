import { ComponentType } from 'react';
import clsx from 'clsx';

import ReviewsItem from '@/components/reviews/ReviewsItem';

import type { IReview } from '@/types/models/review';
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  reviews?: IReview[];
}

const ReviewsList: ComponentType<IProps & IPropsWithClassName> = ({ reviews, className }) => {
  reviews = reviews ?? [];

  return (
    <div className={clsx(styles.reviewsList, className)}>
      <ul className={styles.list}>
        {reviews.map(review => (
          <li key={review.id!} className={styles.item}>
            <ReviewsItem review={review} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReviewsList;
