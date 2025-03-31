'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type React from 'react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { StarRating } from '@/components/base/StarRating';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { ServerActionResponse } from '@/types';

interface CommentFormProps {
  onFormSubmit: (values: CommentFormValues) => Promise<ServerActionResponse>;
}

const commentFormSchema = z.object({
  comment: z.string().min(1, { message: 'Comment is required' }),
  rating: z.number().min(1, { message: 'Rating is required' }).max(5),
});

export type CommentFormValues = z.infer<typeof commentFormSchema>;

export function CommentForm(props: CommentFormProps) {
  const { onFormSubmit } = props;

  const [isPending, startTransition] = useTransition();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: '',
      rating: 0,
    },
  });

  const submitHandler = async (values: CommentFormValues) => {
    startTransition(async () => {
      const result = await onFormSubmit(values);

      if (result.success) {
        toast.success('Comment added successfully');

        form.reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  const isSubmitting = form.formState.isSubmitting || isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="rating" className="block text-sm font-medium text-foreground">
                Your Rating
              </FormLabel>
              <FormControl>
                <StarRating
                  rating={field.value}
                  disabled={isSubmitting}
                  interactive={true}
                  onRatingChange={field.onChange}
                  size="lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="comment" className="block text-sm font-medium text-foreground">
                Your Comment
              </FormLabel>
              <FormControl>
                <Textarea
                  id="comment"
                  disabled={isSubmitting}
                  placeholder="Share your experience with this recipe..."
                  {...field}
                  rows={4}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Sending...' : 'Submit Review'}
        </Button>
      </form>
    </Form>
  );
}
