import type { ChangeEvent, FC, KeyboardEvent } from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { cn } from '@/utils';

import { useFormField } from '@/components/ui/form';

// List of available numeric modes
enum Modes {
  natural = 'natural',
  integer = 'integer',
  floating = 'floating',
  scientific = 'scientific',
}

type Value = string;

export type Props = {
  /** Set controlled value */
  value?: Value;
  /** Provide a callback to capture changes */
  onChange?: (value?: Value) => void;
  /**
   * Define a number to increase or decrease input value
   * when user clicks arrow keys
   */
  step?: number;
  /** Set a maximum value available for arrow stepping */
  max?: number;
  /** Set a minimum value available for arrow stepping */
  min?: number;
  /** Select a mode of numeric input */
  mode?: keyof typeof Modes;
  /** Set at a placeholder text for the input */
  placeholder?: string;
  /** Additional className for the container */
  className?: string;
  /** Optional unit to display next to the input value */
  unit?: string;
};

const patternMapping = {
  [Modes.natural]: '(?:0|[1-9]\\d*)',
  [Modes.integer]: '[+\\-]?(?:0|[1-9]\\d*)',
  [Modes.floating]: '[+\\-]?(?:0|[1-9]\\d*)(?:\\.\\d+)?',
  [Modes.scientific]: '[+\\-]?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+\\-]?\\d+)?',
};

export const InputNumeric: FC<Props> = ({
  value,
  step = 1,
  max = Infinity,
  min = -Infinity,
  onChange = () => {},
  mode = Modes.scientific,
  placeholder,
  className,
  unit,
}) => {
  const id = useId();
  const { error } = useFormField();
  const unitRef = useRef<HTMLSpanElement>(null);
  const [unitWidth, setUnitWidth] = useState(0);

  useEffect(() => {
    if (unitRef.current) {
      setUnitWidth(unitRef.current.offsetWidth);
    }
  }, [unit]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const inputValue = (event.target as HTMLInputElement).value;
      if (event.key === 'ArrowUp') {
        const nextValue = Number(inputValue || 0) + step;
        if (nextValue <= max) {
          onChange(nextValue.toString());
        }
      }
      if (event.key === 'ArrowDown') {
        const nextValue = Number(inputValue || 0) - step;
        if (nextValue >= min) {
          onChange(nextValue.toString());
        }
      }
    },
    [max, min, onChange, step],
  );
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  const pattern = patternMapping[mode];

  const showUnit = unit && value && !error;

  const dynamicPadding = useMemo(() => {
    if (showUnit && unitWidth > 0) {
      return { paddingRight: `${unitWidth + 14}px` };
    }
    return {};
  }, [showUnit, unitWidth]);

  return (
    <div className="relative flex items-center">
      <input
        inputMode="decimal"
        autoComplete="off"
        pattern={pattern}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value !== undefined ? value : ''}
        type="text"
        id={id}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          'text-right tabular-nums',
          error && 'border-destructive focus-visible:ring-destructive',
          className,
        )}
        placeholder={placeholder}
        style={dynamicPadding}
      />

      {showUnit && (
        <span
          ref={unitRef}
          className="pointer-events-none absolute right-3 text-sm text-muted-foreground">
          {unit}
        </span>
      )}
    </div>
  );
};
