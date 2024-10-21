import { LucideProps } from 'lucide-react';
import { ComponentType } from 'react';

import { libreBaskerville } from '@/constants';

interface StatisticCardProps {
  icon: ComponentType<LucideProps>;
  title: string;
  value: string;
  notAvailable?: boolean;
}

export default function StatisticCard(props: StatisticCardProps) {
  const { icon: Icon, title, value, notAvailable } = props;

  return (
    <div className="flex min-h-40 w-full flex-col rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <Icon className="size-5 text-gray-700" />
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>

      {notAvailable ? (
        <div
          className={`${libreBaskerville.className} flex flex-1 flex-col items-center justify-center py-2 text-center`}>
          <p className="text-xl text-gray-400">Available soon</p>
          <p className="text-sm text-gray-400">We're working on it! Stay tuned.</p>
        </div>
      ) : (
        <p
          className={`${libreBaskerville.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
          {value}
        </p>
      )}
    </div>
  );
}
