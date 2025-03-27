import { useFieldArray, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

export const PreparationStepsFormSchema = z.object({
  steps: z.array(
    z.object({
      description: z.string().min(1, 'Step description is required'),
    }),
  ),
});

export default function PreparationStepsForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps',
  });

  return (
    <div className="grid h-fit gap-5">
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-[1fr,_auto] gap-4">
          <FormField
            control={control}
            name={`steps.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-[18px] text-red-500">*</span>
                  Step {index + 1}
                </FormLabel>

                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g., In a large pot, bring water to a boil and add salt."
                    className="min-h-[100px]"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="mt-8"
            onClick={() => remove(index)}>
            -
          </Button>
        </div>
      ))}

      <Button type="button" size="sm" onClick={() => append({ description: '' })}>
        Add Step
      </Button>
    </div>
  );
}
