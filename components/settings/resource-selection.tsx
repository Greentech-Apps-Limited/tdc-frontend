import SelectableAccordion from '../ui/selectable-accordion';
import { TranslationInfo } from '@/lib/types/surah-translation-type';
import { useSettings } from '@/contexts/settings-provider';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import { useTranslations } from 'next-intl';

interface WBWTranslationLang {
  id: string;
  label: string;
}

const ResourceSelection = () => {
  const t = useTranslations('Settings');
  const { selectedTranslation, wbwTr, updateWbwTr, updateSelectedTranslation } = useSettings(
    state => ({
      selectedTranslation: state.selectedTranslation,
      wbwTr: state.wbwTr,
      updateWbwTr: state.updateWbwTr,
      updateSelectedTranslation: state.updateSelectedTranslation,
    })
  );
  const updateSearchParams = useUpdateSearchParams();

  // FIXME: Hardcoded for now needs to be refactored
  const wbwTranslationItems: WBWTranslationLang[] = [
    { id: 'en', label: 'English' },
    { id: 'bn', label: 'Bangla' },
  ];
  const translationItems: TranslationInfo[] = [
    {
      id: 19,
      name: 'M. Pickthall',
      author_name: 'Mohammed Marmaduke William Pickthall',
      slug: 'quran.en.pickthall',
      language_name: 'english',
      translated_name: {
        name: 'M. Pickthall',
        language_name: 'english',
      },
    },
    {
      id: 20,
      name: 'Saheeh International',
      author_name: 'Saheeh International',
      slug: 'en-sahih-international',
      language_name: 'english',
      translated_name: {
        name: 'Saheeh International',
        language_name: 'english',
      },
    },
  ];

  const handleTranslationChange = (newSelection: string[]) => {
    const newTranslations = newSelection.map(Number);
    updateSelectedTranslation(newTranslations);
    updateSearchParams(wbwTr, newTranslations);
  };

  const handleWBWChange = (newSelection: string[]) => {
    const newWbwTr = newSelection[0] || wbwTranslationItems[0]?.id || 'en';
    updateWbwTr(newWbwTr);
    updateSearchParams(newWbwTr, selectedTranslation);
  };

  if (wbwTranslationItems.length === 0) {
    wbwTranslationItems.push({ id: 'en', label: 'English' });
  }

  return (
    <div className="space-y-2">
      <SelectableAccordion
        title={t('translations')}
        items={translationItems}
        isMultiple={true}
        selectedItems={selectedTranslation.map(String)}
        onSelectionChange={handleTranslationChange}
        idKey="id"
        labelKey="name"
        forceSelection={true}
      />
      <SelectableAccordion
        title={t('wordByWord')}
        items={wbwTranslationItems}
        isMultiple={false}
        selectedItems={[wbwTr]}
        onSelectionChange={handleWBWChange}
        idKey="id"
        labelKey="label"
        forceSelection={true}
      />
    </div>
  );
};

export default ResourceSelection;
