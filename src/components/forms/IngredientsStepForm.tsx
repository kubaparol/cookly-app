import { useFieldArray, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { units } from '@/constants/units';

import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const IngredientsStepFormSchema = z.object({
  ingredients: z.array(
    z.object({
      quantity: z.string().min(1, 'Quantity is required'),
      unit: z.string().min(1, 'Unit is required'),
      name: z.string().min(1, 'Ingredient name is required'),
    }),
  ),
});

export default function IngredientsStepForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  return (
    <div className="grid h-fit gap-5">
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-[1fr,_1fr,_2fr,_auto] gap-4">
          <FormField
            control={control}
            name={`ingredients.${index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-[18px] text-red-500">*</span>
                  Quantity
                </FormLabel>

                <FormControl>
                  <Input {...field} placeholder="e.g., 2" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`ingredients.${index}.unit`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-[18px] text-red-500">*</span>
                  Unit
                </FormLabel>

                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue {...field} placeholder="e.g., cups" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((group) => (
                        <div key={group.label}>
                          <div className="px-2 py-1.5 text-xs font-semibold">{group.label}</div>
                          {group.options.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </div>
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
            name={`ingredients.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-[18px] text-red-500">*</span>
                  Ingredient
                </FormLabel>

                <FormControl>
                  <Input {...field} placeholder="e.g., all-purpose flour" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="mt-8"
            onClick={() => remove(index)}>
            -
          </Button>
        </div>
      ))}

      <Button type="button" size="sm" onClick={() => append({ quantity: '', unit: '', name: '' })}>
        Add Ingredient
      </Button>
    </div>
  );
}
