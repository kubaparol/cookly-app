import { PlusCircle, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { units } from '@/constants';

import { InputNumeric } from '@/components/base/InputNumeric';

import { Button } from '../../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { IngredientsStepFormValues } from './schemas';

export default function IngredientsStepForm() {
  const { control } = useFormContext<IngredientsStepFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 gap-4 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-[1fr,1fr,2fr,auto]">
          <FormField
            control={control}
            name={`ingredients.${index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <span className="text-[18px] text-red-500">*</span>
                  Quantity
                </FormLabel>

                <FormControl>
                  <InputNumeric {...field} mode="natural" min={0} step={1} placeholder="e.g., 2" />
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
                <FormLabel className="flex items-center">
                  <span className="text-[18px] text-red-500">*</span>
                  Unit
                </FormLabel>

                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue {...field} placeholder="e.g., cups" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((group) => (
                        <div key={group.label}>
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                            {group.label}
                          </div>
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
                <FormLabel className="flex items-center">
                  <span className="text-[18px] text-red-500">*</span>
                  Ingredient
                </FormLabel>

                <FormControl>
                  <Input {...field} placeholder="e.g., all-purpose flour" className="w-full" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end justify-end pb-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => remove(index)}>
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Remove ingredient</span>
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="mt-2 flex w-full items-center justify-center gap-2"
        onClick={() => append({ quantity: '', unit: '', name: '' })}>
        <PlusCircle className="h-4 w-4" />
        Add another ingredient
      </Button>
    </div>
  );
}
