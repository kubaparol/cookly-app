import { ReactNode } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";

interface HomeLayoutProps {
  readonly children: ReactNode;
}

export default function HomeLayout(props: HomeLayoutProps) {
  const { children } = props;

  return (
    <>
      <Header />
      <main className="wrapper min-h-[calc(100vh-80px-60px)]">{children}</main>
      <Footer />
    </>
  );
}
