import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

dayjs.extend(relativeTime);

export function CommentReply({
  imageUrl,
  firstName,
  lastName,
  content,
  createdAt,
}: {
  imageUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  content: string;
  createdAt: Date;
}) {
  const formatDate = (date: Date) => {
    return dayjs(date).fromNow();
  };

  return (
    <div className="mt-4 border-l-2 border-muted py-2 pl-4">
      <div className="flex items-start justify-between">
        <div className="flex w-full items-start gap-2">
          {imageUrl && (
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{`${firstName?.charAt(0)}${lastName?.charAt(0)}`}</AvatarFallback>
            </Avatar>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">
                {firstName && lastName ? `${firstName} ${lastName}` : 'You'}
              </span>
              <span className="text-xs text-muted-foreground">{formatDate(createdAt)}</span>
            </div>
            <p className="mt-1 break-words text-sm md:text-base">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
