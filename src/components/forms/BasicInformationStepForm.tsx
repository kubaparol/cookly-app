import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { categories, cuisineTypes } from '@/constants';
import { mealTypes } from '@/constants/meal-types';

import FileUploader from '../base/FileUploader';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { MultiSelect } from '../ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

export const BasicInformationStepFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title must be at most 255 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters')
    .optional(),
  image: z.any(),
  cuisineType: z.string().min(1, 'Cuisine Type is required'),
  mealType: z.string().min(1, 'Meal Type is required'),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
});

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
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid h-fit gap-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-[18px] text-red-500">*</span>
                Title
              </FormLabel>

              <FormControl>
                <Input {...field} placeholder="e.g., Classic Spaghetti Bolognese" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>

              <FormControl className="h-32">
                <Textarea
                  placeholder="e.g., A rich and hearty Italian pasta dish with a savory meat sauce..."
                  {...field}
                  className="rounded-2xl"
                />
              </FormControl>

              <FormMessage data-testid="error-message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="text-[18px] text-red-500">*</span>
                Image
              </FormLabel>

              <FormControl>
                <FileUploader onFieldChange={field.onChange} value={field.value} />
              </FormControl>

              <FormMessage data-testid="error-message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cuisineType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuisine Type</FormLabel>

              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue {...field} placeholder="e.g., Mexican" />
                  </SelectTrigger>

                  <SelectContent>
                    {cuisineTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
          name="mealType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Type</FormLabel>

              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue {...field} placeholder="e.g., Breakfast" />
                  </SelectTrigger>

                  <SelectContent>
                    {mealTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>

              <FormControl>
                <MultiSelect
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  options={categories}
                  placeholder="e.g., Vegetarian"
                />
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
