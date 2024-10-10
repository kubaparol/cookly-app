import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/constants";

export const metadata: Metadata = {
  title: {
    template: "%s | Cookly",
    default: "Cookly",
  },
  description: "Cookly is a recipe sharing platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
