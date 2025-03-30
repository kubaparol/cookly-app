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
      <main className="container mx-auto flex flex-1 flex-col px-4 py-6 md:px-6">{children}</main>
      <Footer />
    </div>
  );
}
