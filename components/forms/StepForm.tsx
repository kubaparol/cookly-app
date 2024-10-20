import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ButtonProps } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

interface StepFormProps {
  leftButton?: ButtonProps;
  defaultValues?: StepFormValues;
  onFormSubmit: (values: StepFormValues) => void;
}

export const StepFormSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(1000, 'Description must be at most 1000 characters'),
});

export type StepFormValues = z.infer<typeof StepFormSchema>;

export default function StepForm(props: StepFormProps) {
  const { leftButton, defaultValues, onFormSubmit } = props;

  const id = useId();

  const form = useForm<StepFormValues>({
    resolver: zodResolver(StepFormSchema),
    defaultValues: defaultValues || {
      id: id,
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-5">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>

              <FormControl className="h-32">
                <Textarea
                  placeholder="e.g., Preheat the oven to 180°C and grease the baking tray..."
                  {...field}
                  className="rounded-2xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <footer className="flex items-center justify-between">
          {leftButton && (
            <Button type="button" size="lg" {...leftButton}>
              Cancel
            </Button>
          )}

          <Button type="submit" size="lg">
            Save
          </Button>
        </footer>
      </form>
    </Form>
  );
}
