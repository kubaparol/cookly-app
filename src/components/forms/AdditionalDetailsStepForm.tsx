import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { dietaryTags } from '@/constants/dietary-tags';
import { difficultyLevels } from '@/constants/difficulty-levels';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { MultiSelect } from '../ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

export const AdditionalDetailsStepFormSchema = z.object({
  difficulty: z.string().min(1, 'Difficulty level is required'),
  dietaryTags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type AdditionalDetailsStepFormValues = z.infer<typeof AdditionalDetailsStepFormSchema>;

interface AdditionalDetailsStepFormProps {
  onFormSubmit: (values: AdditionalDetailsStepFormValues) => void;
}

export default function AdditionalDetailsStepForm(props: AdditionalDetailsStepFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<AdditionalDetailsStepFormValues>({
    resolver: zodResolver(AdditionalDetailsStepFormSchema),
    defaultValues: {
      difficulty: '',
      dietaryTags: [],
      notes: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid h-fit gap-5">
        <FormField
          control={form.control}
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
                    <SelectValue {...field} placeholder="e.g., Beginner" />
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
          control={form.control}
          name="dietaryTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Tags</FormLabel>

              <FormControl>
                <MultiSelect
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  options={dietaryTags}
                  placeholder="e.g., Gluten-Free, Vegan"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Additional Notes</FormLabel>

              <FormControl className="h-32">
                <Textarea
                  placeholder="e.g., Storage tips, serving suggestions, variations..."
                  {...field}
                  className="rounded-2xl"
                />
              </FormControl>

              <FormMessage data-testid="error-message" />
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
