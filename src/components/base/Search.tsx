'use client';

import { Search as SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '../ui/input';

interface SearchProps {
  placeholder: string;
  pathPattern?: string;
}

export default function Search(props: SearchProps) {
  const { placeholder, pathPattern } = props;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    let newPath = pathname;
    if (pathPattern) {
      newPath = pathPattern.replace(':page', '1');
      newPath = newPath.replace('{query}', term || '');
    }

    replace(`${newPath}?${params.toString()}`);
  }, 300);

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
