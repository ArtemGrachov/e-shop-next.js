import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <h1>
        Demo Next.js E-Commerce website
      </h1>
      <h2>
        Test translation {t('test')}
      </h2>
    </>
  );
}
