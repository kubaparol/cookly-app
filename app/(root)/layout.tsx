import HomeLayout from "@/components/layouts/HomeLayout";
import { ReactNode } from "react";

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return <HomeLayout>{children}</HomeLayout>;
}
