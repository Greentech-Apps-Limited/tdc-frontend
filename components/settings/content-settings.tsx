import React, { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

interface ContentSettings {
  arabic: boolean;
  wordbyword: boolean;
  translation: boolean;
  tajweed: boolean;
}

interface ContentSettingsOption {
  id: keyof ContentSettings;
  label: string;
}

const contentOptions: ContentSettingsOption[] = [
  { id: 'arabic', label: 'Arabic' },
  { id: 'wordbyword', label: 'Word by Word' },
  { id: 'translation', label: 'Translation' },
  { id: 'tajweed', label: 'Tajweed' },
];

const ContentSettings = () => {
  const [settings, setSettings] = useState<ContentSettings>({
    arabic: false,
    wordbyword: false,
    translation: false,
    tajweed: false,
  });

  const handleCheckboxChange = (option: keyof ContentSettings) => {
    setSettings(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <section className="space-y-2">
      <p className="text-xs font-semibold text-neutral-700">Content</p>
      <div className="space-y-1">
        {contentOptions.map(option => (
          <div
            key={option.id}
            className={`flex items-center space-x-2 rounded-full p-2 hover:bg-neutral-50 ${
              settings[option.id] ? 'bg-neutral-50' : ''
            }`}
          >
            <Checkbox
              id={option.id}
              checked={settings[option.id]}
              onCheckedChange={() => handleCheckboxChange(option.id)}
            />
            <label
              htmlFor={option.id}
              className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentSettings;
