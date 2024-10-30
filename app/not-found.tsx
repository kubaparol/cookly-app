'use client';

import HomeLayout from '@/components/layouts/HomeLayout';
import StatusCard from '@/components/shared/StatusCard';

export default function NotFoundPage() {
  return (
    <HomeLayout>
      <div className="flex h-full flex-1 items-center justify-center">
        <StatusCard
          type="alert"
          title="Oops! Page not found"
          message="We're sorry, but it seems the page you're looking for doesn't exist!"
        />
      </div>
    </HomeLayout>
  );
}
