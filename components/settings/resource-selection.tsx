import SelectableAccordion from '../ui/selectable-accordion';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import { useSettings } from '@/contexts/settings-provider';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import { useTranslations } from 'next-intl';

interface WBWTranslationLang {
  id: string;
  label: string;
}

const ResourceSelection = ({ translationsInfo }: { translationsInfo: TranslationItem[] }) => {
  const tafsir = translationsInfo.filter(item => item.has_tafseer);
  const translationItems = translationsInfo.filter(item => !item.has_tafseer);

  const t = useTranslations('Settings');
  const {
    selectedTranslation,
    selectedTafseer,
    updateSelectedTafseer,
    wbwTr,
    updateWbwTr,
    updateSelectedTranslation,
  } = useSettings(state => ({
    selectedTranslation: state.selectedTranslation,
    selectedTafseer: state.selectedTafseer,
    wbwTr: state.wbwTr,
    updateWbwTr: state.updateWbwTr,
    updateSelectedTranslation: state.updateSelectedTranslation,
    updateSelectedTafseer: state.updateSelectedTafseer,
  }));
  const updateSearchParams = useUpdateSearchParams();

  // FIXME: Hardcoded for now needs to be refactored
  const wbwTranslationItems: WBWTranslationLang[] = [
    { id: 'en', label: 'English' },
    { id: 'id', label: 'Indonesia' },
  ];

  const handleTranslationChange = (newSelection: string[]) => {
    const newTranslations = newSelection.map(Number);
    updateSelectedTranslation(newTranslations);
    updateSearchParams(wbwTr, newTranslations);
  };

  const handleTafseerChange = (newSelection: string[]) => {
    const newTafseer = newSelection.map(Number);
    updateSelectedTafseer(newTafseer);
    // updateSearchParams(wbwTr, newTranslations);
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
        title={t('Tafsirs')}
        items={tafsir}
        isMultiple={true}
        selectedItems={selectedTafseer.map(String)}
        onSelectionChange={handleTafseerChange}
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
