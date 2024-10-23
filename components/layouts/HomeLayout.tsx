import { ReactNode } from 'react';

import Footer from '../base/Footer';
import Header from '../base/Header';

interface HomeLayoutProps {
  readonly children: ReactNode;
}

export default function HomeLayout(props: HomeLayoutProps) {
  const { children } = props;

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-80px)] flex-col pt-[75px]">{children}</main>
      <Footer />
    </>
  );
}
