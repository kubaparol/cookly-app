import { Metadata } from 'next';

import StatisticCards from './StatisticCards';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <StatisticCards />
    </div>
  );
}
