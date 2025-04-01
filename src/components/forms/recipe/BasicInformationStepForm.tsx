import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useUploadThing } from '@/lib/uploadthing';

import { categories, cuisineTypes } from '@/constants';
import { mealTypes } from '@/constants/meal-types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import FileUploader from '../../base/FileUploader';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { MultiSelect } from '../../ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { BasicInformationStepFormValues } from './schemas';

export default function BasicInformationStepForm() {
  const { control, setValue, clearErrors } = useFormContext<BasicInformationStepFormValues>();
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing('imageUploader');

  const onImageChange = async (file: File | null) => {
    if (!file) {
      setValue('imageUrl', '');
      return;
    }

    setIsUploading(true);
    try {
      const uploadedImages = await startUpload([file]);

      if (!uploadedImages) return;

      const uploadedImageUrl = uploadedImages[0].url;
      setValue('imageUrl', uploadedImageUrl);
      clearErrors('imageUrl');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recipe Identity</CardTitle>
          <CardDescription>
            Give your recipe a name and description that will make it stand out
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-6">
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

                  <FormControl>
                    <Textarea
                      placeholder="e.g., A rich and hearty Italian pasta dish with a savory meat sauce..."
                      {...field}
                      rows={4}
                      className="rounded-2xl"
                    />
                  </FormControl>

                  <FormMessage data-testid="error-message" />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recipe Image</CardTitle>
          <CardDescription>Upload a high-quality image that showcases your dish</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    <FileUploader
                      onFieldChange={onImageChange}
                      value={field.value}
                      loading={isUploading}
                    />
                  </FormControl>

                  <FormMessage data-testid="error-message" />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Image Tips</Label>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Use natural lighting for the best results
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Take photos from multiple angles
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Show the finished dish on a plate or in a serving dish
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Recommended size: 1200 x 800 pixels or larger
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Maximum file size: 10MB
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Classification</CardTitle>
          <CardDescription>
            Help users find your recipe by categorizing it correctly
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          </div>

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

          <p className="text-xs text-muted-foreground">
            Select categories that best describe your recipe (e.g., Vegetarian, Quick & Easy)
          </p>
        </CardContent>
      </Card>
    </>
  );
}
