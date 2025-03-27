import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { units } from '@/constants/units';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const ingredientSchema = z.object({
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().min(1, 'Unit is required'),
  name: z.string().min(1, 'Ingredient name is required'),
});

export const IngredientsStepFormSchema = z.object({
  ingredients: z.array(ingredientSchema).min(1, 'At least one ingredient is required'),
});

export type IngredientsStepFormValues = z.infer<typeof IngredientsStepFormSchema>;

interface IngredientsStepFormProps {
  onFormSubmit: (values: IngredientsStepFormValues) => void;
}

export default function IngredientsStepForm(props: IngredientsStepFormProps) {
  const { onFormSubmit } = props;

  const form = useForm<IngredientsStepFormValues>({
    resolver: zodResolver(IngredientsStepFormSchema),
    defaultValues: {
      ingredients: [{ quantity: '', unit: '', name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid h-fit gap-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Ingredients</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => append({ quantity: '', unit: '', name: '' })}>
            Add Ingredient
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">Ingredient {index + 1}</h4>
              {fields.length > 1 && (
                <Button type="button" size="sm" variant="destructive" onClick={() => remove(index)}>
                  Remove
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name={`ingredients.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`ingredients.${index}.unit`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue {...field} placeholder="e.g., tbsp" />
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
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Onion" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <Button type="submit" size="sm" className="w-fit">
          Next
        </Button>
      </form>
    </Form>
  );
}
