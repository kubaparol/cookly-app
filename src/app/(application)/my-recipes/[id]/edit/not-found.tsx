import { ProjectUrls } from '@/constants';

import StatusCard from '@/components/shared/StatusCard';

export default function NotFound() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <StatusCard
        type="alert"
        title="Oops! Recipe not found"
        message="Sorry, but we could not find the recipe you are looking for."
        primaryAction={{ label: 'Back to dashboard', href: ProjectUrls.dashboard }}
        secondaryAction={{ label: 'View all of your recipes', href: ProjectUrls.myRecipes }}
      />
    </div>
  );
}
