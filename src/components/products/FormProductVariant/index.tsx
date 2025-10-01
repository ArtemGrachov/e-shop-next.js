import { ComponentType, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocale } from 'next-intl';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';

interface IProps {
  product: IProduct;
  currentVariant?: IProductVariant;
  onSubmit?: (variant: IProductVariant | undefined) => any;
}

export interface IFormProductVariant {
  variantId: number | undefined;
}

const FormProductVariant: ComponentType<IProps> = ({ product, currentVariant, onSubmit }) => {
  const { register, handleSubmit, setValue } = useForm<IFormProductVariant>({ defaultValues: { variantId: currentVariant?.id } });
  const locale = useLocale();

  const submitHandler: SubmitHandler<IFormProductVariant> = (formValue) => {
    const variant = product.variants.find(v => v.id == formValue.variantId);
    onSubmit && onSubmit(variant);
  }

  const variantIdOptions = useMemo(() => {
    return product.variants.map(variant => ({ label: variant.name[locale], value: variant.id }));
  }, [product]);

  const formSubmitCallback = handleSubmit(submitHandler);

  const variantIdInput = register('variantId', { onChange: formSubmitCallback });

  useEffect(() => {
    setValue('variantId', currentVariant?.id);
  }, [currentVariant]);

  return (
    <form onSubmit={formSubmitCallback}>
      <select {...variantIdInput}>
        {variantIdOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </form>
  )
}

export default FormProductVariant;
