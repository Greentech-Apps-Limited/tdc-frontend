import React, { useMemo } from 'react';
import SelectableAccordion from '../ui/selectable-accordion';
import { Slider } from '../ui/slider';
import { useSettings } from '@/contexts/settings-provider';

type FontType = {
  id: string;
  name: string;
};

const FontSettings = () => {
  const { arabicFont, arabicFontSize, translationFont, updateSettings } = useSettings(state => ({
    arabicFont: state.arabicFont,
    arabicFontSize: state.arabicFontSize,
    translationFont: state.translationFontSize,
    updateSettings: state.updateSettings,
  }));

  const fonts = useMemo<FontType[]>(
    () => [
      { id: 'lateef', name: 'Lateef' },
      { id: 'source_sans_3', name: 'Source Sans 3' },
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
      <p className="text-xs font-semibold text-neutral-700">Font</p>
      <div className="space-y-4">
        {fonts.length > 0 && (
          <SelectableAccordion
            title="Arabic Font"
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
          <p className="text-sm">Arabic Font Size: {arabicFontSize}px</p>
          <Slider
            value={[arabicFontSize]}
            min={minFontSize}
            max={maxFontSize}
            step={fontSizeStep}
            onValueChange={handleArabicFontSizeChange}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm">Translation/Tafsir Font Size: {translationFont}px</p>
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