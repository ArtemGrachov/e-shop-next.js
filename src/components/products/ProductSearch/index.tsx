'use client';

import { ComponentType, useMemo } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { pathcat } from 'pathcat';
import { Search } from 'react-bootstrap-icons';

import { ROUTES } from '@/router/routes';

import styles from './styles.module.scss';

interface IFormSearch {
  search: string;
}

const ProductSearch: ComponentType = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
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

    let comparePath = pathcat('/', ROUTES.CATALOG, pathParams);

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

    const newPath = pathcat('/', ROUTES.CATALOG, pathParams);

    router.push(newPath);
  }

  return (
    <form className={styles.productSearch} onSubmit={handleSubmit(submitHandler)}>
      <input
        type="text"
        className={styles.input}
        {...searchInput}
        defaultValue={search}
      />
      <button type="submit" className={styles.submit}>
        <Search size={'100%'} />
      </button>
    </form>
  )
}

export default ProductSearch;
