import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form } from '../ui/form';

export const ReviewSubmitStepFormSchema = z.object({});

export type ReviewSubmitStepFormValues = z.infer<typeof ReviewSubmitStepFormSchema>;

interface ReviewSubmitStepFormProps {
  onFormSubmit: (values: ReviewSubmitStepFormValues) => void;
}

export default function ReviewSubmitStepForm(props: ReviewSubmitStepFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<ReviewSubmitStepFormValues>({
    resolver: zodResolver(ReviewSubmitStepFormSchema),
    defaultValues: {},
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-2">
        <Button type="submit" size="sm" className="w-fit">
          Next
        </Button>
      </form>
    </Form>
  );
}
