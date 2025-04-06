import { cn } from '@/utils';

import { dancingScript } from '@/constants/fonts';

export function Logo() {
  return <span className={cn(dancingScript.className, 'text-4xl font-semibold')}>Cookly</span>;
}
