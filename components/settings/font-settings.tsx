import React, { useState, useMemo, useCallback } from 'react';
import SelectableAccordion from '../ui/selectable-accordion';
import { Slider } from '../ui/slider';

type FontType = {
  id: string;
  name: string;
};

const FontSettings = () => {
  const fonts = useMemo<FontType[]>(
    () => [
      { id: 'arabic', name: 'Arabic' },
      { id: 'naskh', name: 'Naskh' },
      { id: 'indopak', name: 'IndoPak' },
    ],
    []
  );

  const [selectedFont, setSelectedFont] = useState<string>(fonts[0]?.id || '');
  const [arabicFontSize, setArabicFontSize] = useState<number>(24);
  const [translationFontSize, setTranslationFontSize] = useState<number>(16);

  const minFontSize = 12;
  const maxFontSize = 32;
  const fontSizeStep = 1;

  const handleFontChange = useCallback(
    (selectedFonts: string[]) => {
      setSelectedFont(selectedFonts[0] || fonts[0]?.id || '');
    },
    [fonts]
  );

  const handleFontSizeChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<number>>) => (value: number[]) => {
      if (value[0] !== undefined) {
        setter(Math.max(minFontSize, value[0]));
      }
    },
    [minFontSize]
  );

  return (
    <section className="space-y-4">
      <p className="text-xs font-semibold text-neutral-700">Font</p>
      <div className="space-y-4">
        {fonts.length > 0 && (
          <SelectableAccordion
            title="Arabic Font"
            items={fonts}
            isMultiple={false}
            selectedItems={[selectedFont]}
            onSelectionChange={handleFontChange}
            idKey="id"
            labelKey="name"
          />
        )}
        <div className="space-y-2">
          <p className="text-sm">Arabic Font Size: {arabicFontSize}px</p>
          <Slider
            value={[arabicFontSize]}
            min={minFontSize}
            max={maxFontSize}
            step={fontSizeStep}
            onValueChange={handleFontSizeChange(setArabicFontSize)}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm">Translation/Tafsir Font Size: {translationFontSize}px</p>
          <Slider
            value={[translationFontSize]}
            min={minFontSize}
            max={maxFontSize}
            step={fontSizeStep}
            onValueChange={handleFontSizeChange(setTranslationFontSize)}
          />
        </div>
      </div>
    </section>
  );
};

export default FontSettings;
