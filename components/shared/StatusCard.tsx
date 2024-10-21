import { AlertTriangle, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';

interface StatusCardProps {
  type: 'success' | 'alert';
  title: string;
  message: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export default function StatusCard(props: StatusCardProps) {
  const { type, title, message, primaryAction, secondaryAction } = props;
  return (
    <div className="grid gap-8">
      <div className="flex flex-col items-center space-y-4">
        {type === 'success' ? (
          <BadgeCheck className="size-36 text-green-400" />
        ) : (
          <AlertTriangle className={`size-36 text-primary`} />
        )}

        <h1 className="text-center text-3xl font-bold text-primary-800">{title}</h1>

        <p className="text-center text-primary-900">{message}</p>
      </div>

      <div className="mx-auto flex w-full max-w-56 flex-col space-y-2">
        <Button asChild>
          <Link href={primaryAction.href}>{primaryAction.label}</Link>
        </Button>

        {secondaryAction && (
          <Button asChild variant="outline">
            <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
