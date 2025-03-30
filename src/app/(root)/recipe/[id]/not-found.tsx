import { ProjectUrls } from '@/constants';

import StatusCard from '@/components/shared/StatusCard';

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <StatusCard
        type="alert"
        title="Oops! Recipe not found"
        message="Sorry, but we could not find the recipe you are looking for."
        primaryAction={{ label: 'Back to home page', href: ProjectUrls.home }}
        secondaryAction={{ label: 'View all recipes', href: ProjectUrls.recipes }}
      />
    </section>
  );
}
