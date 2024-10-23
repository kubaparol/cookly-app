import { AlertTriangle, BadgeCheck, ConciergeBellIcon, Frown, LucideProps } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

import { Button } from '../ui/button';

interface StatusCardProps {
  type: 'success' | 'alert' | 'construction' | 'sad' | 'no-icon';
  title: string;
  message?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export default function StatusCard(props: StatusCardProps) {
  const { type, title, message, primaryAction, secondaryAction } = props;

  const iconMap: Record<StatusCardProps['type'], ComponentType<LucideProps>> = {
    success: BadgeCheck,
    alert: AlertTriangle,
    construction: ConciergeBellIcon,
    sad: Frown,
    'no-icon': () => null,
  };

  const colorMap: Record<StatusCardProps['type'], string> = {
    success: 'green-400',
    alert: 'primary',
    construction: 'primary',
    sad: 'primary',
    'no-icon': 'primary',
  };

  const Icon = iconMap[type];

  return (
    <div className="grid gap-8">
      <div className="flex flex-col items-center space-y-4">
        <Icon className={`size-36 text-${colorMap[type]}`} />

        <h1 className="text-center text-3xl font-bold text-primary-800">{title}</h1>

        {message && <p className="text-center text-primary-900">{message}</p>}
      </div>

      <div className="mx-auto flex w-full max-w-56 flex-col space-y-2">
        {primaryAction &&
          (primaryAction.href ? (
            <Button asChild>
              <Link href={primaryAction.href}>{primaryAction.label}</Link>
            </Button>
          ) : (
            <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
          ))}

        {secondaryAction && (
          <Button asChild variant="outline">
            <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
