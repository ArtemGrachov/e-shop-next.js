import { ChangeEvent, ComponentType, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';

interface IProps {
  product: IProduct;
  currentVariant?: IProductVariant;
  onSubmit?: (formValue: IFormBuyOutput) => any;
  onVariantSelect?: (variant?: IProductVariant | null) => any;
}

export interface IFormBuyProduct {
  variantId: string | undefined;
  quantity: string;
}

export interface IFormBuyOutput {
  quantity: number;
  variant?: IProductVariant | null;
}

const FormBuyProduct: ComponentType<IProps> = ({ product, currentVariant, onSubmit, onVariantSelect }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { register, handleSubmit } = useForm<IFormBuyProduct>({ defaultValues: { variantId: currentVariant?.id, quantity: '1' } });

  const getVariant = (variantId?: string | number) => {
    if (variantId == null) {
      return null;
    }

    return product.variants.find(v => v.id == variantId);
  }

  const submitHandler: SubmitHandler<IFormBuyProduct> = (formValue) => {
    const output: IFormBuyOutput = {
      quantity: +formValue.quantity,
      variant: getVariant(formValue.variantId),
    }
    onSubmit && onSubmit(output);
  }

  const variantSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onVariantSelect && onVariantSelect(getVariant(e.target.value));
  }

  const variantIdOptions = useMemo(() => {
    return product.variants.map(variant => ({ label: variant.name[locale], value: variant.id }));
  }, [product]);

  const formSubmitCallback = handleSubmit(submitHandler);

  const variantIdInput = register('variantId', { onChange: variantSelectHandler });
  const quantityInput = register('quantity');

  return (
    <form onSubmit={formSubmitCallback}>
      <select {...variantIdInput}>
        {variantIdOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <input type="number" min="1" {...quantityInput} />
      <button type="submit">
        {t('form_buy_product.submit')}
      </button>
    </form>
  )
}

export default FormBuyProduct;
