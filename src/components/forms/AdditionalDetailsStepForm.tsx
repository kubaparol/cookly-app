import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form } from '../ui/form';

export const AdditionalDetailsStepFormSchema = z.object({});

export type AdditionalDetailsStepFormValues = z.infer<typeof AdditionalDetailsStepFormSchema>;

interface AdditionalDetailsStepFormProps {
  onFormSubmit: (values: AdditionalDetailsStepFormValues) => void;
}

export default function AdditionalDetailsStepForm(props: AdditionalDetailsStepFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<AdditionalDetailsStepFormValues>({
    resolver: zodResolver(AdditionalDetailsStepFormSchema),
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
