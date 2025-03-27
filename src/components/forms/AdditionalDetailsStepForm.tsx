import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { dietaryTags, difficultyLevels } from '@/constants';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { MultiSelect } from '../ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

export const AdditionalDetailsStepFormSchema = z.object({
  difficulty: z.string().min(1, 'Difficulty level is required'),
  dietaryTags: z.array(z.string()).min(1, 'At least one dietary tag is required'),
  notes: z.string().optional(),
});

export default function AdditionalDetailsStepForm() {
  const { control } = useFormContext();

  return (
    <div className="grid h-fit gap-5">
      <FormField
        control={control}
        name="difficulty"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="text-[18px] text-red-500">*</span>
              Difficulty Level
            </FormLabel>

            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue {...field} placeholder="e.g., Easy" />
                </SelectTrigger>

                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dietaryTags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="text-[18px] text-red-500">*</span>
              Dietary Tags
            </FormLabel>

            <FormControl>
              <MultiSelect
                onValueChange={field.onChange}
                defaultValue={field.value}
                options={dietaryTags}
                placeholder="e.g., Vegetarian"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes</FormLabel>

            <FormControl>
              <Textarea
                {...field}
                placeholder="e.g., This recipe can be made ahead and reheated."
                className="min-h-[100px]"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
