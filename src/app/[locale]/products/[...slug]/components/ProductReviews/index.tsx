'use client';

import { ComponentType } from 'react';

import { useReviewCtx } from '@/providers/reviews/hooks/use-review-ctx';
import { useReviewStore } from '@/providers/reviews/hooks/use-review-store';

import FormReview, { IFormReview } from '@/components/reviews/FormReview';
import ReviewsList from '@/components/reviews/ReviewsList';

import type { IProduct } from '@/types/models/product';

interface IProps {
  product: IProduct;
}

const ProductReviews: ComponentType<IProps> = ({ product }) => {
  const { sendReview } = useReviewCtx();
  const reviewSubmitStaus = useReviewStore(s => s.submitStatus);

  const sendReviewHandler = (formValue: IFormReview) => {
    return sendReview(product!.id, formValue);
  }

  return (
    <>
      {<ReviewsList reviews={product.reviews} />}
      <FormReview onSubmit={sendReviewHandler} submitStatus={reviewSubmitStaus} />
    </>
  )
}

export default ProductReviews;
