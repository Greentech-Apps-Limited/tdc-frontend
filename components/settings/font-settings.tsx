import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import SelectableAccordion from '../ui/selectable-accordion';
import { Slider } from '../ui/slider';
import { useSettings } from '@/contexts/settings-provider';
import { useNumberTranslation } from '@/hooks/use-number-translation';

type FontType = {
  id: string;
  name: string;
};

const FontSettings = () => {
  const t = useTranslations('Settings');
  const translateNumber = useNumberTranslation();
  const { arabicFont, arabicFontSize, translationFont, updateSettings } = useSettings(state => ({
    arabicFont: state.arabicFont,
    arabicFontSize: state.arabicFontSize,
    translationFont: state.translationFontSize,
    updateSettings: state.updateSettings,
  }));

  const fonts = useMemo<FontType[]>(
    () => [
      { id: 'lateef', name: 'Lateef' },
      { id: 'qalam', name: 'Qalam' },
      { id: 'kfgqpc_hafs', name: 'KFGQPC Hafs' },
      { id: 'kitab', name: 'Kitab' },
      { id: 'amiri', name: 'Amiri' },
      { id: 'meQuran', name: 'Me Quran' },
    ],
    []
  );

  const minFontSize = 14;
  const maxFontSize = 60;
  const fontSizeStep = 1;

  const handleFontChange = (selectedFonts: string[]) => {
    const newArabicFont = selectedFonts[0] || fonts[0]?.id || '';
    updateSettings({ arabicFont: newArabicFont });
  };

  const handleArabicFontSizeChange = (value: number[]) => {
    if (value[0] !== undefined) {
      const newSize = Math.max(minFontSize, value[0]);
      updateSettings({ arabicFontSize: newSize });
    }
  };

  const handleTranslationFontSizeChange = (value: number[]) => {
    if (value[0] !== undefined) {
      const newSize = Math.max(minFontSize, value[0]);
      updateSettings({ translationFontSize: newSize });
    }
  };

  return (
    <section className="space-y-4">
      <p className="text-xs font-semibold text-neutral-700">{t('font')}</p>
      <div className="space-y-4">
        {fonts.length > 0 && (
          <SelectableAccordion
            title={t('arabicFont')}
            items={fonts}
            isMultiple={false}
            selectedItems={[arabicFont]}
            onSelectionChange={handleFontChange}
            idKey="id"
            labelKey="name"
            forceSelection={true}
          />
        )}
        <div className="space-y-2">
          <p className="text-sm">
            {t('arabicFontSize', { size: translateNumber(arabicFontSize) })}
          </p>
          <Slider
            value={[arabicFontSize]}
            min={minFontSize}
            max={maxFontSize}
            step={fontSizeStep}
            onValueChange={handleArabicFontSizeChange}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            {t('translationTafsirFontSize', { size: translateNumber(translationFont) })}
          </p>
          <Slider
            value={[translationFont]}
            min={minFontSize}
            max={maxFontSize}
            step={fontSizeStep}
            onValueChange={handleTranslationFontSizeChange}
          />
        </div>
      </div>
    </section>
  );
};

export default FontSettings;
