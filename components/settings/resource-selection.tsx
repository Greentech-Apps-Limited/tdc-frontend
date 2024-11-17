import SelectableAccordion from '../ui/selectable-accordion';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import { useSettings } from '@/contexts/settings-provider';
import { useTranslations } from 'next-intl';
import { WbwLanguage } from '@/lib/types/wbw-types';
import { LANGUAGE_NAMES } from '@/data/language-names';
import { useToast } from '@/hooks/use-toast';

const MAX_SELECTIONS = 5;

const ResourceSelection = ({
  translationsInfo,
  wbwLanguages,
}: {
  translationsInfo: TranslationItem[];
  wbwLanguages: WbwLanguage[];
}) => {
  const { toast } = useToast();
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
    if (newTranslations.length > MAX_SELECTIONS) {
      toast({
        variant: 'destructive',
        title: 'Selection Limit Reached',
        description: `You can only select up to ${MAX_SELECTIONS} translations at a time.`,
      });
      return;
    }
    updateSelectedTranslation(newTranslations);
  };

  const handleTafseerChange = (newSelection: string[]) => {
    const newTafseer = newSelection.map(Number);
    if (newTafseer.length > MAX_SELECTIONS) {
      toast({
        variant: 'destructive',
        title: 'Selection Limit Reached',
        description: `You can only select up to ${MAX_SELECTIONS} tafsirs at a time.`,
      });
      return;
    }
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
        isGrouped={true}
        groupBy="language"
        renderGroupTitle={lang => LANGUAGE_NAMES[lang as keyof typeof LANGUAGE_NAMES] || lang}
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
        isGrouped={true}
        groupBy="language"
        renderGroupTitle={lang => LANGUAGE_NAMES[lang as keyof typeof LANGUAGE_NAMES] || lang}
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
