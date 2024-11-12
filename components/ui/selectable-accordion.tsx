import React, { useCallback, useMemo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { Checkbox } from './checkbox';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { CheckedState } from '@radix-ui/react-checkbox';

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
  const handleCheckboxChange = useCallback(
    (state: CheckedState, itemId: string) => {
      if (isMultiple) {
        if (forceSelection && selectedItems.length === 1 && !state) {
          return;
        }
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
    },
    [isMultiple, forceSelection, selectedItems, onSelectionChange]
  );

  const handleRadioChange = useCallback(
    (value: string) => {
      onSelectionChange([value]);
    },
    [onSelectionChange]
  );

  const selectionText = useMemo(() => {
    if (isMultiple) {
      return `${selectedItems.length} Selected`;
    } else {
      const selectedItem = items.find(item => String(item[idKey]) === selectedItems[0]);
      return selectedItem ? String(selectedItem[labelKey]) : 'None selected';
    }
  }, [isMultiple, selectedItems, items, idKey, labelKey]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="text-start font-normal">
            <p className="text-sm">{title}</p>
            <p className="text-xs text-neutral-600">{selectionText}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {isMultiple ? (
            items.map(item => {
              const id = String(item[idKey]);
              const label = String(item[labelKey]);
              return (
                <CheckboxItem
                  key={id}
                  id={id}
                  label={label}
                  checked={selectedItems.includes(id)}
                  onChange={handleCheckboxChange}
                />
              );
            })
          ) : (
            <RadioGroup
              value={selectedItems[0] || ''}
              onValueChange={handleRadioChange}
              className="space-y-1"
            >
              {items.map(item => {
                const id = String(item[idKey]);
                const label = String(item[labelKey]);
                return (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="flex cursor-pointer items-center space-x-2 rounded-md p-1 text-sm font-medium leading-none hover:bg-neutral-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <RadioGroupItem value={id} id={id} className="m-2 " />
                      {label}
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (state: CheckedState, itemId: string) => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = React.memo(({ id, label, checked, onChange }) => (
  <div>
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center space-x-2 rounded-md p-1 text-sm font-medium leading-none hover:bg-neutral-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      <Checkbox id={id} checked={checked} onCheckedChange={e => onChange(e, id)} />
      {label}
    </label>
  </div>
));

CheckboxItem.displayName = 'CheckboxItem';

export default SelectableAccordion;
