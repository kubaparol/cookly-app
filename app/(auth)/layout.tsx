import { ReactNode } from "react";

interface AuthLayoutProps {
  readonly children: ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      {children}
    </div>
  );
}
