'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ExternalLink, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import { ProjectUrls } from '@/constants';

import { replyToComment } from '@/db';

import { StarRating } from '@/components/base/StarRating';
import { CommentReplyForm, CommentReplyFormValues } from '@/components/forms/CommentReplyForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { CommentReply } from './CommentReply';

dayjs.extend(relativeTime);

interface Comment {
  id: string;
  recipeId: string;
  authorId: string;
  rating: number;
  content: string;
  createdAt: Date;
  recipe: {
    id: string;
    title: string | null;
    imageUrl: string | null;
  };
  author: {
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
  };
  replies?: {
    id: string;
    content: string;
    createdAt: Date;
  }[];
}

interface CommentsReceivedProps {
  comments: Comment[];
}

export function CommentsReceived({ comments }: CommentsReceivedProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return dayjs(date).fromNow();
  };

  const handleSubmitReply = useCallback(
    async (values: CommentReplyFormValues, commentId: string, recipeId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      return await replyToComment({
        reply: values.reply,
        commentId,
        recipeId,
      });
    },
    [],
  );

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-6">
          <MessageSquare className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">No comments yet</h3>
        <p className="max-w-md text-base text-muted-foreground">
          You haven&apos;t received any comments on your recipes yet. Comments will appear here once
          people start engaging with your content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-4 rounded-lg border p-4 md:p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="flex items-start gap-3">
              {comment.author.imageUrl && (
                <Avatar className="h-10 w-10 flex-shrink-0 border">
                  <AvatarImage
                    src={comment.author.imageUrl}
                    alt={`${comment.author.firstName} ${comment.author.lastName} avatar`}
                  />
                  <AvatarFallback>{comment.author.firstName?.charAt(0)}</AvatarFallback>
                </Avatar>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-medium">{comment.author.firstName}</h4>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1">
                  <StarRating rating={comment.rating} size="sm" />
                  <span className="ml-1 text-xs text-muted-foreground">
                    {comment.rating.toFixed(1)}
                  </span>
                </div>

                <p className="mt-2 break-words text-sm">{comment.content}</p>
              </div>
            </div>

            {comment.replies?.length === 0 && (
              <Badge
                variant="outline"
                className="w-fit border border-orange-400/30 bg-orange-400/10 text-xs text-orange-400 hover:bg-orange-500/20 dark:border-orange-300/50 dark:bg-orange-300/20 dark:text-orange-300">
                Needs Reply
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-md bg-muted/30 p-2">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
              {comment.recipe.imageUrl && (
                <Image
                  src={comment.recipe.imageUrl}
                  alt={comment.recipe.title ? comment.recipe.title : 'Recipe image'}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              {comment.recipe.title ? (
                <Link
                  href={ProjectUrls.recipe(comment.recipe.id)}
                  target="_blank"
                  className="flex items-center gap-1 truncate text-sm font-medium hover:underline">
                  {comment.recipe.title}
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                </Link>
              ) : (
                <div className="flex items-center gap-1 truncate text-sm font-medium">
                  Untitled Recipe
                </div>
              )}
              <p className="text-xs text-muted-foreground">Your Recipe</p>
            </div>
          </div>

          {/* Reply section */}
          {comment.replies && comment.replies.length > 0 && (
            <CommentReply
              content={comment.replies[0].content}
              createdAt={comment.replies[0].createdAt}
            />
          )}

          {/* Reply button and form */}
          {comment.replies && comment.replies.length === 0 && (
            <div>
              {replyingTo !== comment.id ? (
                <Button
                  onClick={() => setReplyingTo(comment.id)}
                  className="w-full sm:w-auto"
                  variant="secondary">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Reply to this comment
                </Button>
              ) : (
                <CommentReplyForm
                  commentId={comment.id}
                  onFormSubmit={(values) => handleSubmitReply(values, comment.id, comment.recipeId)}
                  onCancel={() => setReplyingTo(null)}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
