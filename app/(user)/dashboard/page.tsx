import { appPageTitles, ProjectUrls } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: appPageTitles[ProjectUrls.dashboard],
};

export default function DashboardPage() {
  return <section></section>;
}
