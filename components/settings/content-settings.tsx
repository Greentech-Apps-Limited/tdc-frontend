import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { useSettings } from '@/contexts/settings-provider';

type ContentOption = 'showByWords' | 'showTajweed' | 'showTranslation' | 'showArabic';

interface ContentItem {
  id: ContentOption;
  label: string;
}

// FIXME: Update and Add for new settings
const contentItems: ContentItem[] = [
  // { id: 'showArabic', label: 'Arabic' },
  { id: 'showByWords', label: 'Word by Word' },
  { id: 'showTranslation', label: 'Translation' },
  // { id: 'showTajweed', label: 'Tajweed' },
];

const ContentSettings = () => {
  const settings = useSettings();
  const { updateSettings } = settings;

  const handleCheckboxChange = (option: ContentOption) => {
    updateSettings({ [option]: !settings[option] });
  };

  const renderCheckbox = ({ id, label }: ContentItem) => (
    <div
      key={id}
      className={`flex items-center space-x-2 rounded-full p-2 hover:bg-neutral-50 ${
        settings[id] ? 'bg-neutral-50' : ''
      }`}
    >
      <Checkbox
        id={id}
        checked={settings[id] as boolean}
        onCheckedChange={() => handleCheckboxChange(id)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );

  return (
    <section className="space-y-2">
      <p className="text-xs font-semibold text-neutral-700">Content</p>
      <div className="space-y-1">{contentItems.map(renderCheckbox)}</div>
    </section>
  );
};

export default ContentSettings;
