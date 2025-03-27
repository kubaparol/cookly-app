import { PlusCircle, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '../../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Textarea } from '../../ui/textarea';
import { PreparationStepsFormValues } from './schemas';

export default function PreparationStepsForm() {
  const { control } = useFormContext<PreparationStepsFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps',
  });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 gap-4 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-[1fr,auto]">
          <FormField
            control={control}
            name={`steps.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {index + 1}
                  </span>
                  <span>
                    <span className="mr-1 text-sm font-medium text-destructive">*</span>
                    Step {index + 1}
                  </span>
                </FormLabel>

                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g., In a large pot, bring water to a boil and add salt."
                    className="min-h-[100px] w-full resize-y"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-start justify-end pt-10">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => remove(index)}>
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Remove step</span>
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="mt-2 flex w-full items-center justify-center gap-2"
        onClick={() => append({ description: '' })}>
        <PlusCircle className="h-4 w-4" />
        Add next step
      </Button>
    </div>
  );
}
