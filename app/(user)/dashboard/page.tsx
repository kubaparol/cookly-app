import PageTitle from "@/components/base/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <section>
      <PageTitle title="Dashboard" />
    </section>
  );
}
