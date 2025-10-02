import { IReview } from '@/types/models/review';
import { ComponentType } from 'react';

interface IProps {
  review: IReview;
}

const ReviewsItem: ComponentType<IProps> = ({ review }) => {
  return (
    <div>
      <p>
        ★{review.rate}
      </p>
      <p>
        <em>{review.message}</em>
      </p>
    </div>
  )
}

export default ReviewsItem;
