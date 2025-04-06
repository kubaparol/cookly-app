import { ReactNode } from 'react';

import { Footer } from '../base/Footer';
import { Header } from '../base/Header';

interface HomeLayoutProps {
  readonly children: ReactNode;
}

export default function HomeLayout(props: HomeLayoutProps) {
  const { children } = props;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
