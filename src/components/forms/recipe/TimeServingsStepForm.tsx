import { useFormContext, useWatch } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { TimeServingsStepFormValues } from './schemas';

export default function TimeServingsStepForm() {
  const { control } = useFormContext<TimeServingsStepFormValues>();

  const preparationTime = useWatch({
    control,
    name: 'preparationTime',
  });

  const cookingTime = useWatch({
    control,
    name: 'cookingTime',
  });

  const restTime = useWatch({
    control,
    name: 'restTime',
  });

  const totalTime =
    (Number(preparationTime) || 0) + (Number(cookingTime) || 0) + (Number(restTime) || 0);

  return (
    <div className="grid h-fit gap-5">
      <div className="grid grid-cols-1 gap-4 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-3">
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
          name="restTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rest Time (minutes)</FormLabel>

              <FormControl>
                <Input {...field} type="number" min="0" placeholder="e.g., 10" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-2">
        <FormField
          control={control}
          name="activeTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active Time (minutes)</FormLabel>

              <FormControl>
                <Input {...field} type="number" min="0" placeholder="e.g., 20" />
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

      <div className="grid grid-cols-1 gap-4 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-2">
        <FormField
          control={control}
          name="servingSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serving Size</FormLabel>

              <FormControl>
                <Input {...field} placeholder="e.g., 300g or 1 cup" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="yield"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yield</FormLabel>

              <FormControl>
                <Input {...field} placeholder="e.g., 12 cookies or 2 cups" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="text-center">
          <span className="text-lg font-medium">Total Time: {totalTime} minutes</span>
        </div>
      </div>
    </div>
  );
}
