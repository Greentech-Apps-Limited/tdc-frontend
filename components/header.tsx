import Settings from './settings/settings';
import LanguageSelector from './language-selector';
import { TranslationItem, TranslationResponse } from '@/lib/types/surah-translation-type';
import { fetcher } from '@/services/api';
import { WbwLanguage, WbwResponse } from '@/lib/types/wbw-types';

export const fetchWbwAndTranslations = async (): Promise<{
  wbwLanguages: WbwLanguage[];
  translations: TranslationItem[];
}> => {
  const [wbwResponse, translationsResponse] = await Promise.all([
    fetcher<WbwResponse>('/quran/wbws/'),
    fetcher<TranslationResponse>('/quran/translations/'),
  ]);

  return {
    wbwLanguages: wbwResponse.languages,
    translations: translationsResponse.results,
  };
};

const Header = async () => {
  const { wbwLanguages, translations } = await fetchWbwAndTranslations();

  return (
    <header className="flex h-16 items-center justify-end border-b border-neutral-200 bg-neutral px-6 py-4 shadow">
      <section className="flex items-center gap-4">
        <LanguageSelector />
        <Settings translationsInfo={translations} wbwLanguages={wbwLanguages} />
      </section>
    </header>
  );
};

export default Header;
