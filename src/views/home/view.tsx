import { getLocale } from 'next-intl/server';

import ContentEN from './content/en';
import ContentDE from './content/de';

import styles from './styles.module.scss';

const HomeView = async () => {
  const locale = await getLocale();

  let content;

  switch (locale) {
    case 'en': {
      content = <ContentEN />;
      break;
    }
    case 'de': {
      content = <ContentDE />;
      break;
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {content}
      </div>
    </main>
  )
}

export default HomeView;
