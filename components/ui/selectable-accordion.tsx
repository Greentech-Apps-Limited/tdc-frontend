import React, { useCallback, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckedState } from '@radix-ui/react-checkbox';

interface BaseSelectableAccordionProps<T> {
  title: string;
  items: T[];
  isMultiple: boolean;
  selectedItems: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  idKey: keyof T;
  labelKey: keyof T;
  forceSelection?: boolean;
}

interface GroupedProps<T> extends BaseSelectableAccordionProps<T> {
  groupBy: keyof T;
  renderGroupTitle?: (groupKey: string) => string;
  isGrouped: true;
}

interface NonGroupedProps<T> extends BaseSelectableAccordionProps<T> {
  isGrouped?: false;
}

type SelectableAccordionProps<T> = GroupedProps<T> | NonGroupedProps<T>;

function SelectableAccordion<T>({
  title,
  items,
  isMultiple,
  selectedItems,
  onSelectionChange,
  idKey,
  labelKey,
  forceSelection = false,
  ...props
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

  const groupedItems = useMemo(() => {
    if (!props.isGrouped) return null;

    return items.reduce(
      (groups, item) => {
        const langCode = String(item[props.groupBy]);
        const groupKey = props.renderGroupTitle?.(langCode) || langCode;

        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
      },
      {} as Record<string, T[]>
    );
  }, [items, props]);

  // Sort groups alphabetically
  const sortedGroups = useMemo(() => {
    if (!props.isGrouped || !groupedItems) return null;

    return Object.keys(groupedItems).sort((a, b) => a.localeCompare(b));
  }, [groupedItems]);

  const selectionText = useMemo(() => {
    if (isMultiple) {
      return `${selectedItems.length} Selected`;
    } else {
      const selectedItem = items.find(item => String(item[idKey]) === selectedItems[0]);
      return selectedItem ? String(selectedItem[labelKey]) : 'None selected';
    }
  }, [isMultiple, selectedItems, items, idKey, labelKey]);

  const renderItems = (itemsList: T[]) =>
    isMultiple ? (
      <div className="space-y-1">
        {itemsList.map(item => {
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
        })}
      </div>
    ) : (
      <RadioGroup value={selectedItems[0] || ''} onValueChange={handleRadioChange}>
        {itemsList.map(item => {
          const id = String(item[idKey]);
          const label = String(item[labelKey]);
          return (
            <div key={id}>
              <label
                htmlFor={id}
                className="flex cursor-pointer items-center space-x-2 rounded-md p-1 text-sm font-medium leading-none hover:bg-neutral-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <RadioGroupItem value={id} id={id} className="m-2" />
                {label}
              </label>
            </div>
          );
        })}
      </RadioGroup>
    );

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
          {props.isGrouped && sortedGroups && groupedItems ? (
            <div className="space-y-4">
              {sortedGroups.map(groupKey => (
                <div key={groupKey} className="space-y-2">
                  <h3 className="text-sm font-semibold text-neutral-500">
                    {props.renderGroupTitle?.(groupKey) || groupKey}
                  </h3>
                  {renderItems(groupedItems[groupKey] || [])}
                </div>
              ))}
            </div>
          ) : (
            renderItems(items)
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
