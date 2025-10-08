'use client';

import { ComponentType } from 'react';

import { useReviewCtx } from '../../providers/reviews/hooks/use-review-ctx';
import { useReviewStore } from '../../providers/reviews/hooks/use-review-store';

import FormReview, { IFormReview } from '@/components/reviews/FormReview';
import ReviewsList from '@/components/reviews/ReviewsList';

import type { IProduct } from '@/types/models/product';
import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IProps {
  product: IProduct;
}

const ProductReviews: ComponentType<IProps & IPropsWithClassName> = ({ className, product }) => {
  const { sendReview } = useReviewCtx();
  const reviews = useReviewStore(s => s.reviews);
  const reviewSubmitStaus = useReviewStore(s => s.submitStatus);

  const sendReviewHandler = (formValue: IFormReview) => {
    return sendReview(product.id, formValue);
  }

  return (
    <div className={className}>
      {<ReviewsList className={styles.reviewsList} reviews={reviews} />}
      <FormReview onSubmit={sendReviewHandler} submitStatus={reviewSubmitStaus} />
    </div>
  )
}

export default ProductReviews;
