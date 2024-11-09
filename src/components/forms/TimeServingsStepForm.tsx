import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form } from '../ui/form';

export const TimeServingsStepFormSchema = z.object({});

export type TimeServingsStepFormValues = z.infer<typeof TimeServingsStepFormSchema>;

interface TimeServingsStepFormProps {
  onFormSubmit: (values: TimeServingsStepFormValues) => void;
}

export default function TimeServingsStepForm(props: TimeServingsStepFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<TimeServingsStepFormValues>({
    resolver: zodResolver(TimeServingsStepFormSchema),
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
