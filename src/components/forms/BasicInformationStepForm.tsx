import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form } from '../ui/form';

export const BasicInformationStepFormSchema = z.object({});

export type BasicInformationStepFormValues = z.infer<typeof BasicInformationStepFormSchema>;

interface BasicInformationStepFormProps {
  onFormSubmit: (values: BasicInformationStepFormValues) => void;
}

export default function BasicInformationStepForm(props: BasicInformationStepFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<BasicInformationStepFormValues>({
    resolver: zodResolver(BasicInformationStepFormSchema),
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
