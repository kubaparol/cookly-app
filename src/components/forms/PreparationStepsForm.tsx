import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form } from '../ui/form';

export const PreparationStepsFormSchema = z.object({});

export type PreparationStepsFormValues = z.infer<typeof PreparationStepsFormSchema>;

interface PreparationStepsFormProps {
  onFormSubmit: (values: PreparationStepsFormValues) => void;
}

export default function PreparationStepsForm(props: PreparationStepsFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<PreparationStepsFormValues>({
    resolver: zodResolver(PreparationStepsFormSchema),
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
