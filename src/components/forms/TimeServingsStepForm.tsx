import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
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

export default function TimeServingsStepForm() {
  const { control } = useFormContext();

  return (
    <div className="grid h-fit gap-5">
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </div>
  );
}
