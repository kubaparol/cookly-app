import { ReactNode } from 'react';

interface AuthLayoutProps {
  readonly children: ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return <div className="flex min-h-screen w-full items-center justify-center">{children}</div>;
}
