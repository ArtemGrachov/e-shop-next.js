'use client';

import { ComponentType, useMemo } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Search } from 'react-bootstrap-icons';
import clsx from 'clsx';

import { useRoutePath } from '@/hooks/routing/use-route-path';
import InputPrimary from '@/components/inputs/InputPrimary';
import InputPrimaryButton from '@/components/inputs/InputPrimaryButton';

import { ROUTES } from '@/router/routes';

import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

interface IFormSearch {
  search: string;
}

interface IProps {
  onSubmit?: Function;
}

const ProductSearch: ComponentType<IProps & IPropsWithClassName> = ({ className, onSubmit }) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const routePath = useRoutePath();
  const searchParams = useSearchParams();
  const search = useMemo(() => {
    return searchParams.get('search') as string;
  }, [searchParams]);

  const { register, handleSubmit } = useForm<IFormSearch>({ defaultValues: { search } });

  const searchInput = register('search');

  const submitHandler = (formValue: IFormSearch) => {
    let pathParams: Record<string, string | undefined> = {
      slugId: params.slug?.[0] ?? '',
    } as Record<string, string>;

    let comparePath = routePath(ROUTES.CATALOG, pathParams);

    if (comparePath.slice(-1) === '/') {
      comparePath = comparePath.slice(0, -1);
    }

    const currentlyOnCatalog = comparePath === pathname;

    if (!currentlyOnCatalog) {
      pathParams = { slugId: '' };
    }

    const searchQuery = formValue.search?.trim();

    if (searchQuery) {
      pathParams.search = searchQuery;
    } else {
      pathParams.search = undefined;
    }

    const newPath = routePath(ROUTES.CATALOG, pathParams);

    router.push(newPath);

    if (onSubmit) {
      onSubmit();
    }
  }

  return (
    <form className={clsx(styles.productSearch, className)} onSubmit={handleSubmit(submitHandler)}>
      <InputPrimary
        formControl={searchInput}
        inputAttrs={{
          type: 'text',
          defaultValue: search,
        }}
        icon={
          <InputPrimaryButton>
            <Search size={'100%'} />
          </InputPrimaryButton>
        }
      />
    </form>
  )
}

export default ProductSearch;
