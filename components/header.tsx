import Settings from './settings/settings';
import LanguageSelector from './language-selector';
import { TranslationItem, TranslationResponse } from '@/lib/types/surah-translation-type';
import { fetcher } from '@/services/api';

const fetchTranslations = async (): Promise<TranslationItem[]> => {
  const data = await fetcher<TranslationResponse>(
    'https://tdc-backend.greentechapps.com/api/quran/translations/'
  );
  return data.results;
};

const Header = async () => {
  const data = await fetchTranslations();
  return (
    <header className="flex h-16 items-center justify-end border-b border-neutral-200 bg-neutral px-6 py-4 shadow">
      <section className="flex items-center gap-4">
        <LanguageSelector />
        <Settings translationsInfo={data} />
      </section>
    </header>
  );
};

export default Header;
