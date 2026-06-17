import { Select } from '@base-ui/react/select';
import { FIELDS, FIELD_ITEMS } from '../data/fields';
import type { FieldId } from '../data/types';

interface FieldSelectProps {
  value: FieldId | null;
  onChange: (value: FieldId) => void;
  placeholder: string;
  /** Distinguishes the two selects for screen readers. */
  label: string;
}

/**
 * A styled wrapper over Base UI's Select. Base UI ships the behavior and
 * accessibility unstyled; the glass look comes entirely from our tokens.
 */
export function FieldSelect({ value, onChange, placeholder, label }: FieldSelectProps) {
  return (
    <Select.Root
      items={FIELD_ITEMS}
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next as FieldId);
      }}
    >
      <Select.Trigger className="fs-trigger" aria-label={label}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="fs-icon" aria-hidden>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner className="fs-positioner" sideOffset={8} alignItemWithTrigger={false}>
          <Select.Popup className="fs-popup">
            <Select.List>
              {FIELDS.map((field) => (
                <Select.Item key={field.id} value={field.id} className="fs-item">
                  <span className="fs-item-main">
                    <Select.ItemText className="fs-item-label">{field.label}</Select.ItemText>
                    <span className="fs-item-blurb">{field.blurb}</span>
                  </span>
                  <span className="fs-item-tag">{field.tag}</span>
                  <Select.ItemIndicator className="fs-item-check" aria-hidden>
                    <Check />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
