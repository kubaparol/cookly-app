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
      <main className="wrapper flex min-h-[calc(100vh-80px-60px)] flex-col">{children}</main>
      <Footer />
    </>
  );
}
