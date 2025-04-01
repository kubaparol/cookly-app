'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { ServerActionResponse } from '@/types';

interface CommentReplyFormProps {
  commentId: string;
  onFormSubmit: (
    values: CommentReplyFormValues,
    commentId: string,
  ) => Promise<ServerActionResponse>;
  onCancel: () => void;
}

const commentReplyFormSchema = z.object({
  reply: z.string().min(1, { message: 'Reply is required' }).max(250, {
    message: 'Reply must be less than 250 characters',
  }),
});

export type CommentReplyFormValues = z.infer<typeof commentReplyFormSchema>;

export function CommentReplyForm(props: CommentReplyFormProps) {
  const { commentId, onFormSubmit, onCancel } = props;

  const [isPending, startTransition] = useTransition();

  const form = useForm<CommentReplyFormValues>({
    resolver: zodResolver(commentReplyFormSchema),
    defaultValues: {
      reply: '',
    },
  });

  const submitHandler = async (values: CommentReplyFormValues) => {
    startTransition(async () => {
      const result = await onFormSubmit(values, commentId);

      if (result.success) {
        toast.success('Reply added successfully');
        form.reset();
        onCancel();
      } else {
        toast.error(result.message);
      }
    });
  };

  const isSubmitting = form.formState.isSubmitting || isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="mt-4 space-y-3">
        <FormField
          control={form.control}
          name="reply"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormControl>
                <Textarea
                  id="reply"
                  disabled={isSubmitting}
                  placeholder="Write a reply..."
                  {...field}
                  rows={4}
                  className="min-h-[100px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Sending...' : 'Post Reply'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
