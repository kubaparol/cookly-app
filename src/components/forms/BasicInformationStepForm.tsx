import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { useUploadThing } from '@/lib/uploadthing';

import { categories, cuisineTypes } from '@/constants';
import { mealTypes } from '@/constants/meal-types';

import FileUploader from '../base/FileUploader';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
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
  imageUrl: z.string().min(1, 'Image is required'),
  cuisineType: z.string().min(1, 'Cuisine Type is required'),
  mealType: z.string().min(1, 'Meal Type is required'),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
});

export default function BasicInformationStepForm() {
  const { control, setValue } = useFormContext();

  const { startUpload } = useUploadThing('imageUploader');

  const onImageChange = async (file: File | null) => {
    if (!file) {
      setValue('imageUrl', '');
      return;
    }

    const uploadedImages = await startUpload([file]);

    if (!uploadedImages) return;

    const uploadedImageUrl = uploadedImages[0].url;

    setValue('imageUrl', uploadedImageUrl);
  };

  return (
    <div className="grid h-fit gap-5">
      <FormField
        control={control}
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
        control={control}
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
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="text-[18px] text-red-500">*</span>
              Image
            </FormLabel>

            <FormControl>
              <FileUploader onFieldChange={onImageChange} value={field.value} />
            </FormControl>

            <FormMessage data-testid="error-message" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="cuisineType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="text-[18px] text-red-500">*</span>
              Cuisine Type
            </FormLabel>

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
        control={control}
        name="mealType"
        render={({ field }) => (
          <FormItem>
            <span className="text-[18px] text-red-500">*</span>
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
        control={control}
        name="categories"
        render={({ field }) => (
          <FormItem>
            <span className="text-[18px] text-red-500">*</span>
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
    </div>
  );
}
