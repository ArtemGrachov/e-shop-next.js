import { ComponentType } from 'react';

import styles from './styles.module.scss';
import { getTranslations } from 'next-intl/server';

const Footer: ComponentType = async () => {
  const t = await getTranslations();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {t.rich('footer.developed_by', {
          name: () => (
            <a
              className={styles.link}
              href="https://github.com/ArtemGrachov"
              target="_blank"
            >
              Artem Hrachov
            </a>
          ),
          year: () => 2025
        })}
      </div>
    </footer>
  )
}

export default Footer;
