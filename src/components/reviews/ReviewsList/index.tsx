import { ComponentType } from 'react';

import ReviewsItem from '@/components/reviews/ReviewsItem';

import type { IReview } from '@/types/models/review';

interface IProps {
  reviews?: IReview[];
}

const ReviewsList: ComponentType<IProps> = ({ reviews }) => {
  reviews = reviews ?? [];

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id!}>
          <ReviewsItem review={review} />
        </li>
      ))}
    </ul>
  )
}

export default ReviewsList;
