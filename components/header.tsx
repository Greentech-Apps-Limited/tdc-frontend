import Settings from './settings/settings';
import LanguageSelector from './language-selector';
import { TranslationItem, TranslationResponse } from '@/lib/types/surah-translation-type';
import { fetcher } from '@/services/api';
import { WbwLanguage, WbwResponse } from '@/lib/types/wbw-types';
import UserProfileDropdown from './user-profile-dropdown';
import ResponsiveSidebar from './responsive-sidebar';

export const fetchWbwAndTranslations = async (): Promise<{
  wbwLanguages: WbwLanguage[];
  translations: TranslationItem[];
}> => {
  const [wbwResponse, translationsResponse] = await Promise.all([
    fetcher<WbwResponse>('/quran/wbws/'),
    fetcher<TranslationResponse>('/quran/translations/?limit=500'),
  ]);

  return {
    wbwLanguages: wbwResponse.languages,
    translations: translationsResponse.results,
  };
};

const Header = async () => {
  const { wbwLanguages, translations } = await fetchWbwAndTranslations();

  return (
    <header className=" flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:bg-neutral-900 md:px-6">
      <div className="flex items-center lg:hidden">
        <ResponsiveSidebar />
      </div>
      <div className="ml-auto flex items-center gap-3 md:gap-4">
        <div className="flex items-center">
          <LanguageSelector />
        </div>
        <div className="flex items-center">
          <Settings translationsInfo={translations} wbwLanguages={wbwLanguages} />
        </div>
        <div className="flex items-center">
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
