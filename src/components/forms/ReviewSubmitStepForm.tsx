import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Separator } from '../ui/separator';

export const ReviewSubmitStepFormSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms to submit the recipe',
  }),
});

export type ReviewSubmitStepFormValues = z.infer<typeof ReviewSubmitStepFormSchema>;

interface ReviewSubmitStepFormProps {
  onFormSubmit: (values: ReviewSubmitStepFormValues) => void;
}

export default function ReviewSubmitStepForm(props: ReviewSubmitStepFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<ReviewSubmitStepFormValues>({
    resolver: zodResolver(ReviewSubmitStepFormSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid h-fit gap-5">
        <div className="rounded-lg border border-border p-6">
          <h3 className="mb-4 text-lg font-semibold">Final Review</h3>
          <p className="mb-6 text-muted-foreground">
            Please review your recipe details before submitting. Once submitted, your recipe will be
            visible to the community.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Recipe Summary</h4>
              <p className="text-sm text-muted-foreground">
                This is where we would show a summary of all steps to review.
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium">Content Guidelines</h4>
              <ul className="ml-6 mt-2 list-disc text-sm text-muted-foreground">
                <li>Ensure your recipe title is clear and descriptive</li>
                <li>Double-check all ingredient quantities and units</li>
                <li>Make sure preparation steps are clear and in logical order</li>
                <li>Verify cooking times and serving sizes</li>
                <li>Check that your recipe follows our community guidelines</li>
              </ul>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>

              <div className="space-y-1 leading-none">
                <FormLabel>
                  I confirm that this recipe is my own or I have permission to share it, and I agree
                  to the terms and conditions
                </FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="sm" className="w-fit">
          Submit Recipe
        </Button>
      </form>
    </Form>
  );
}
