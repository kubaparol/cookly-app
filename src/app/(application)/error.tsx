'use client';

import StatusCard from '@/components/shared/StatusCard';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage(props: ErrorPageProps) {
  const { reset } = props;

  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <StatusCard
        type="alert"
        title="Oops! Something went wrong"
        message="We're sorry, but it seems our app got a little mixed up. Let's try to fix it!"
        primaryAction={{ label: 'Try again', onClick: reset }}
      />
    </div>
  );
}
