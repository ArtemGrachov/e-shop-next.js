import { ChangeEventHandler, ComponentType } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config';

import type { IPropsWithClassName } from '@/types/other/component-props';

import styles from './styles.module.scss';

const LanguageSwitch: ComponentType<IPropsWithClassName> = ({ className }) => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();

  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const locale = e.target.value;
    let pathParts = pathname.split('/').filter(s => !!s);
    const pathLocale = pathParts[0];
    let newPathLocale: string | null = locale;

    if (newPathLocale === DEFAULT_LOCALE) {
      newPathLocale = null;
    }

    if (LOCALES.includes(pathLocale)) {
      pathParts.splice(0, 1);
    }

    if (newPathLocale) {
      pathParts.unshift(newPathLocale);
    }

    const newPath = '/' + pathParts.join('/');
    window.location.href = newPath;
  }

  return (
    <div className={className}>
      <select className={styles.input} onChange={changeHandler} defaultValue={locale}>
        {LOCALES.map(locale => {
          return (
            <option key={locale} value={locale}>
              {t(`language_switch.${locale}`)}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default LanguageSwitch;
