import React from 'react';

import { cn } from '@/utils';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: {
    href: string;
    label: string;
    isCurrent?: boolean;
  }[];
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  };
  icon?: React.ReactNode;
  className?: string;
}

export function PageWrapper({
  title,
  description,
  children,
  actions,
  breadcrumbs,
  badge,
  icon,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb className="mb-4 text-sm">
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {breadcrumb.isCurrent ? (
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="hidden sm:flex">{icon}</div>}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {badge && (
                <Badge variant={badge.variant || 'secondary'} className="ml-2">
                  {badge.label}
                </Badge>
              )}
            </div>
            {description && <p className="mt-1 text-muted-foreground">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 md:ml-auto">{actions}</div>}
      </div>

      <Separator className="my-6" />

      {children && children}
    </div>
  );
}
