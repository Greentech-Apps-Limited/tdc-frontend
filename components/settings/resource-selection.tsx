import React, { useState } from 'react';
import SelectableAccordion from '../ui/selectable-accordion';
import { TranslationInfo } from '@/lib/types/surah-translation-type';

interface WBWTranslationLang {
  id: string;
  label: string;
}

const ResourceSelection = () => {
  const [selectedTranslations, setSelectedTranslations] = useState<string[]>(['19', '20']);
  const [selectedWBWLang, setSelectedWBWLang] = useState<string[]>(['en']);

  const wbwTranslationItems: WBWTranslationLang[] = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Spanish' },
    { id: 'fr', label: 'French' },
    { id: 'de', label: 'German' },
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
    {
      id: 22,
      name: 'A. Yusuf Ali',
      author_name: 'Abdullah Yusuf Ali',
      slug: 'quran.en.yusufali',
      language_name: 'english',
      translated_name: {
        name: 'A. Yusuf Ali',
        language_name: 'english',
      },
    },
  ];

  return (
    <div className="space-y-2">
      <SelectableAccordion
        title="Translations"
        items={translationItems}
        isMultiple={true}
        selectedItems={selectedTranslations}
        onSelectionChange={setSelectedTranslations}
        idKey="id"
        labelKey="name"
      />
      <SelectableAccordion
        title="Word By Word"
        items={wbwTranslationItems}
        isMultiple={false}
        selectedItems={selectedWBWLang}
        onSelectionChange={setSelectedWBWLang}
        idKey="id"
        labelKey="label"
      />
    </div>
  );
};

export default ResourceSelection;
