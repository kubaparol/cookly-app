import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Checkbox } from '../../ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { ReviewSubmitStepFormValues } from './schemas';

export default function ReviewSubmitStepForm() {
  const { control } = useFormContext<ReviewSubmitStepFormValues>();

  // const formValues = watch();

  // const user = useUser();

  return (
    <div className="grid h-fit gap-5">
      <h2 className="text-center text-2xl font-bold">Review your recipe before submitting</h2>
      <p className="mb-2 text-center text-muted-foreground">
        Check all the data before finalizing the recipe
      </p>

      <Card className="border-2 shadow-md">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-xl">Preview</CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          {/* <RecipeView
            isFormData={true}
            formData={formValues}
            author={{
              firstName: user?.user?.firstName || null,
              lastName: user?.user?.lastName || null,
              imageUrl: user?.user?.imageUrl || null,
            }}
          /> */}
        </CardContent>
      </Card>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <FormField
          control={control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>

              <div className="space-y-2 leading-none">
                <FormLabel>
                  <span className="mr-1 text-[18px] text-red-500">*</span>I confirm that I have read
                  and accept the terms of use
                </FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
