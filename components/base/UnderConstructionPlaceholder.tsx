import { ProjectUrls } from '@/constants';

import StatusCard from '../shared/StatusCard';

export default function UnderConstructionPlaceholder() {
  return (
    <div className="flex h-full flex-1 items-center justify-center py-32">
      <StatusCard
        type="construction"
        title="Coming Soon!"
        message="We’re building something great. Stay tuned for updates!"
        primaryAction={{
          label: 'Go to Home',
          href: ProjectUrls.home,
        }}
      />
    </div>
  );
}
