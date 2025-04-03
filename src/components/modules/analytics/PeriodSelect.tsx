'use client';

import { Calendar } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PeriodSelectProps {
  defaultValue?: string;
}

export default function PeriodSelect({ defaultValue = '30days' }: PeriodSelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [period, setPeriod] = useState(defaultValue);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const urlPeriod = params.get('period');
    if (urlPeriod) {
      setPeriod(urlPeriod);
    }
  }, [searchParams]);

  const handlePeriodChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('period', value);
    } else {
      params.delete('period');
    }

    replace(`${pathname}?${params.toString()}`);
    setPeriod(value);
  };

  return (
    <Select value={period} onValueChange={handlePeriodChange}>
      <SelectTrigger className="w-[180px]">
        <Calendar className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7days">Last 7 days</SelectItem>
        <SelectItem value="30days">Last 30 days</SelectItem>
        <SelectItem value="90days">Last 90 days</SelectItem>
        <SelectItem value="year">Last 12 months</SelectItem>
        <SelectItem value="all">All time</SelectItem>
      </SelectContent>
    </Select>
  );
}
