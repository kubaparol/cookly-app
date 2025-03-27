import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Checkbox } from '../ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

export const ReviewSubmitStepFormSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export default function ReviewSubmitStepForm() {
  const { control } = useFormContext();

  return (
    <div className="grid h-fit gap-5">
      <FormField
        control={control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                <span className="text-[18px] text-red-500">*</span>I accept the terms and conditions
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
