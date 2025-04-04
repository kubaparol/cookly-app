'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ParamSelectProps {
  defaultValue?: string;
  paramName: string;
  options: Option[];
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

interface Option {
  label: string;
  value: string;
}

export function ParamSelect({
  defaultValue = '30days',
  paramName,
  options,
  icon,
  placeholder,
  className,
}: ParamSelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const urlValue = params.get(paramName);

    if (urlValue) {
      setValue(urlValue);
    }
  }, [paramName, searchParams]);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }

    replace(`${pathname}?${params.toString()}`);
    setValue(value);
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className={className}>
        {icon && icon}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
