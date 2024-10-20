import { ReactNode } from 'react';

import AppLayout from '@/components/layouts/AppLayout';

interface AppRootLayoutProps {
  readonly children: ReactNode;
}

export default function AppRootLayout(props: AppRootLayoutProps) {
  const { children } = props;

  return <AppLayout>{children}</AppLayout>;
}
