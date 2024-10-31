import SelectableAccordion from '../ui/selectable-accordion';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import { useSettings } from '@/contexts/settings-provider';
import { useTranslations } from 'next-intl';
import { WbwLanguage } from '@/lib/types/wbw-types';

const ResourceSelection = ({
  translationsInfo,
  wbwLanguages,
}: {
  translationsInfo: TranslationItem[];
  wbwLanguages: WbwLanguage[];
}) => {
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

  const handleTranslationChange = (newSelection: string[]) => {
    const newTranslations = newSelection.map(Number);
    updateSelectedTranslation(newTranslations);
  };

  const handleTafseerChange = (newSelection: string[]) => {
    const newTafseer = newSelection.map(Number);
    updateSelectedTafseer(newTafseer);
  };

  const handleWBWChange = (newSelection: string[]) => {
    const newWbwTr = newSelection[0] || wbwLanguages[0]?.code || 'en';
    updateWbwTr(newWbwTr);
  };

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
        title={t('tafsirs')}
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
        items={wbwLanguages}
        isMultiple={false}
        selectedItems={[wbwTr]}
        onSelectionChange={handleWBWChange}
        idKey="code"
        labelKey="name"
        forceSelection={true}
      />
    </div>
  );
};

export default ResourceSelection;
