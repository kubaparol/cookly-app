'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ExternalLink, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { StarRating } from '@/components/base/StarRating';

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
    author: {
      firstName: string | null;
      lastName: string | null;
    };
  };
  author: {
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
  };
  replies?: {
    id: string;
    content: string;
    author: {
      firstName: string | null;
      lastName: string | null;
      imageUrl: string | null;
    } | null;
    createdAt: Date;
  }[];
}

interface CommentsMadeProps {
  comments: Comment[];
}

export function CommentsMade({ comments }: CommentsMadeProps) {
  const formatDate = (date: Date) => {
    return dayjs(date).fromNow();
  };

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-6">
          <MessageSquare className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">No comments made</h3>
        <p className="max-w-md text-base text-muted-foreground">
          You haven&apos;t commented on any recipes yet. Your comments will appear here once you
          start engaging with other creators&apos; content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-4 rounded-lg border p-4 md:p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-medium">Your comment</h4>
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
              <p className="text-xs text-muted-foreground">
                By {comment.recipe.author.firstName} {comment.recipe.author.lastName}
              </p>
            </div>
          </div>

          {/* Reply section */}
          {comment.replies && comment.replies.length > 0 && (
            <CommentReply
              imageUrl={comment.replies[0].author?.imageUrl}
              firstName={comment.replies[0].author?.firstName}
              lastName={comment.replies[0].author?.lastName}
              content={comment.replies[0].content}
              createdAt={comment.replies[0].createdAt}
            />
          )}
        </div>
      ))}
    </div>
  );
}
