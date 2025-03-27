import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

const stepSchema = z.object({
  description: z.string().min(3, 'Step description is required'),
});

export const PreparationStepsFormSchema = z.object({
  steps: z.array(stepSchema).min(1, 'At least one preparation step is required'),
});

export type PreparationStepsFormValues = z.infer<typeof PreparationStepsFormSchema>;

interface PreparationStepsFormProps {
  onFormSubmit: (values: PreparationStepsFormValues) => void;
}

export default function PreparationStepsForm(props: PreparationStepsFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<PreparationStepsFormValues>({
    resolver: zodResolver(PreparationStepsFormSchema),
    defaultValues: {
      steps: [{ description: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'steps',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid h-fit gap-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Preparation Steps</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => append({ description: '' })}>
            Add Step
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">Step {index + 1}</h4>
              {fields.length > 1 && (
                <Button type="button" size="sm" variant="destructive" onClick={() => remove(index)}>
                  Remove
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name={`steps.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="e.g., Preheat the oven to 350°F (175°C)"
                      className="h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <Button type="submit" size="sm" className="w-fit">
          Next
        </Button>
      </form>
    </Form>
  );
}
