import { ChangeEvent, ComponentType, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';

import FormField from '@/components/forms/FormField';
import Button from '@/components/buttons/Button';

import type { IProduct } from '@/types/models/product';
import type { IProductVariant } from '@/types/models/product-variant';
import type { IPropsWithClassName } from '@/types/other/component-props';
import type { IOrderItem } from '@/types/models/order-item';

import styles from './styles.module.scss';

interface IProps {
  product: IProduct;
  currentVariant?: IProductVariant;
  orderItem?: IOrderItem;
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

const FormBuyProduct: ComponentType<IProps & IPropsWithClassName> = ({
  className,
  product,
  currentVariant,
  orderItem,
  onSubmit,
  onVariantSelect,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const { register, handleSubmit, setValue } = useForm<IFormBuyProduct>({
    defaultValues: {
      variantId: currentVariant?.id,
      quantity: orderItem?.quantity.toString() ?? '1',
    },
  });

  useEffect(() => {
    if (!orderItem) {
      return;
    }

    setValue('quantity', orderItem.quantity.toString());
  }, [orderItem]);

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
    <form className={className} onSubmit={formSubmitCallback}>
      {variantIdOptions.length ? (
        <FormField label={t('form_buy_product.variant')}>
          <select {...variantIdInput} className={styles.input}>
            {variantIdOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </FormField>
      ) : null}
      <div className={styles.buyRow}>
        <input
          type="number"
          min="1"
          className={clsx(styles.input, styles.quantity)}
          {...quantityInput}
        />
        <Button type="submit" variant={'primary'} className={styles.submit}>
          {t(orderItem ? 'form_buy_product.update' : 'form_buy_product.submit')}
        </Button>
      </div>
    </form>
  )
}

export default FormBuyProduct;
