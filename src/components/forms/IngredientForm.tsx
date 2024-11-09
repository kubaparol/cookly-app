import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { units } from '@/constants';

import { Button, ButtonProps } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface IngredientFormProps {
  leftButton?: ButtonProps;
  defaultValues?: IngredientFormValues;
  onFormSubmit: (values: IngredientFormValues) => void;
}

export const ingredientFormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 255 characters'),
  quantity: z.coerce.number().positive('Quantity must be a positive number'),
  unit: z.string().min(1, 'Unit is required'),
});

export type IngredientFormValues = z.infer<typeof ingredientFormSchema>;

export default function IngredientForm(props: IngredientFormProps) {
  const { leftButton, defaultValues, onFormSubmit } = props;

  const id = useId();

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: defaultValues || {
      id: id,
      name: '',
      quantity: 0,
      unit: undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-5">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="e.g., 100" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue {...field} placeholder="e.g., ml" />
                  </SelectTrigger>

                  <SelectContent>
                    {units.map((group) => (
                      <SelectGroup key={group.label}>
                        <SelectLabel>{group.label}</SelectLabel>
                        {group.options.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}

                            {unit.description && (
                              <span className="ml-2 text-xs text-muted-foreground">
                                {unit.description}
                              </span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectGroup>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Olive Oil" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <footer className="flex items-center justify-between">
          {leftButton && (
            <Button type="button" size="lg" {...leftButton}>
              Cancel
            </Button>
          )}

          <Button type="submit" size="lg">
            Save
          </Button>
        </footer>
      </form>
    </Form>
  );
}
