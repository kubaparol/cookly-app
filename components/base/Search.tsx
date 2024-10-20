'use client';

import { Search as SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { Input } from '../ui/input';

// import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  placeholder: string;
}

export default function Search(props: SearchProps) {
  const { placeholder } = props;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // const handleSearch = useDebouncedCallback((term) => {
  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);

      params.set('page', '1');

      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );
  // }, 300);

  return (
    <Input
      startIcon={SearchIcon}
      placeholder={placeholder}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}
