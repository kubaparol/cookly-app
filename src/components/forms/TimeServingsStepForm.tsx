import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

export const TimeServingsStepFormSchema = z.object({
  preparationTime: z
    .string()
    .min(1, 'Preparation time is required')
    .regex(/^\d+$/, 'Must be a valid number'),
  cookingTime: z
    .string()
    .min(1, 'Cooking time is required')
    .regex(/^\d+$/, 'Must be a valid number'),
  servings: z
    .string()
    .min(1, 'Number of servings is required')
    .regex(/^\d+$/, 'Must be a valid number'),
});

export type TimeServingsStepFormValues = z.infer<typeof TimeServingsStepFormSchema>;

interface TimeServingsStepFormProps {
  onFormSubmit: (values: TimeServingsStepFormValues) => void;
}

export default function TimeServingsStepForm(props: TimeServingsStepFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<TimeServingsStepFormValues>({
    resolver: zodResolver(TimeServingsStepFormSchema),
    defaultValues: {
      preparationTime: '',
      cookingTime: '',
      servings: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid h-fit gap-5">
        <FormField
          control={form.control}
          name="preparationTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-[18px] text-red-500">*</span>
                Preparation Time (minutes)
              </FormLabel>

              <FormControl>
                <Input {...field} type="number" min="0" placeholder="e.g., 15" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cookingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-[18px] text-red-500">*</span>
                Cooking Time (minutes)
              </FormLabel>

              <FormControl>
                <Input {...field} type="number" min="0" placeholder="e.g., 30" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="servings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-[18px] text-red-500">*</span>
                Number of Servings
              </FormLabel>

              <FormControl>
                <Input {...field} type="number" min="1" placeholder="e.g., 4" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="sm" className="w-fit">
          Next
        </Button>
      </form>
    </Form>
  );
}
