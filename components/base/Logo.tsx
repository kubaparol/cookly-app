import Image from 'next/image';

import { cn } from '@/utils';

interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps) {
  const { className } = props;

  return (
    <Image
      src="/logo.webp"
      alt="Cookly Home"
      width={150}
      height={150}
      priority
      className={cn('', className)}
    />
  );
}
