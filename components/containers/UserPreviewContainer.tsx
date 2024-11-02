import { useClerk, useUser } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

import { ProjectUrls } from '@/constants';

import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export default function UserPreviewContainer() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  const name = `${user?.firstName} ${user?.lastName}`;
  const email = user?.emailAddresses[0].emailAddress;

  return (
    <div className="grid grid-cols-[auto,_1fr,_auto] items-center gap-3 rounded-md p-2">
      {!isLoaded ? (
        <>
          <Skeleton className="size-8 rounded-full" />

          <div className="grid gap-2">
            <Skeleton className="h-[16px]" />
            <Skeleton className="h-[12px]" />
          </div>
        </>
      ) : (
        <>
          <Image
            src={user?.imageUrl || ''}
            alt={`Profile picture of ${name}`}
            width={32}
            height={32}
            className="rounded-full"
          />

          <div className="grid">
            <p title={name} className="truncate text-sm">
              {name}
            </p>

            <p title={email} className="truncate text-xs text-gray-400">
              {email}
            </p>
          </div>
        </>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => signOut({ redirectUrl: ProjectUrls.home })}>
              <LogOut className="size-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Sign Out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
