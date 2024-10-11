import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter } from "@/constants";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Cookly",
    default: "Cookly",
  },
  description: "Cookly is a recipe sharing platform.",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
