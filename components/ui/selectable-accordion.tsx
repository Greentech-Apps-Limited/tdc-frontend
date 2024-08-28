import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { Checkbox } from './checkbox';

interface SelectableAccordionProps<T> {
  title: string;
  items: T[];
  isMultiple: boolean;
  selectedItems: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  idKey: keyof T;
  labelKey: keyof T;
  forceSelection?: boolean;
}

function SelectableAccordion<T>({
  title,
  items,
  isMultiple,
  selectedItems,
  onSelectionChange,
  idKey,
  labelKey,
  forceSelection = false,
}: SelectableAccordionProps<T>) {
  const handleCheckboxChange = (itemId: string) => {
    if (isMultiple) {
      const updatedSelection = selectedItems.includes(itemId)
        ? selectedItems.filter(id => id !== itemId)
        : [...selectedItems, itemId];
      onSelectionChange(updatedSelection);
    } else {
      if (forceSelection && selectedItems[0] === itemId) {
        return;
      }
      onSelectionChange([itemId]);
    }
  };

  const getSelectionText = (): string => {
    if (isMultiple) {
      return `${selectedItems.length} Selected`;
    } else {
      const selectedItem = items.find(item => String(item[idKey]) === selectedItems[0]);
      return selectedItem ? String(selectedItem[labelKey]) : 'None selected';
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="text-start font-normal">
            <p className="text-sm">{title}</p>
            <p className="text-xs text-neutral-600">{getSelectionText()}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="rounded border border-neutral-200">
          {items.map(item => {
            const id = String(item[idKey]);
            return (
              <div
                key={id}
                className="flex items-center space-x-2 rounded-md p-2 hover:bg-neutral-50"
              >
                <Checkbox
                  id={id}
                  checked={selectedItems.includes(id)}
                  onCheckedChange={() => handleCheckboxChange(id)}
                />
                <label
                  htmlFor={id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {String(item[labelKey])}
                </label>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SelectableAccordion;
