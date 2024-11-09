import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form } from '../ui/form';

export const IngredientsStepFormSchema = z.object({});

export type IngredientsStepFormValues = z.infer<typeof IngredientsStepFormSchema>;

interface IngredientsStepFormProps {
  onFormSubmit: (values: IngredientsStepFormValues) => void;
}

export default function IngredientsStepForm(props: IngredientsStepFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<IngredientsStepFormValues>({
    resolver: zodResolver(IngredientsStepFormSchema),
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
