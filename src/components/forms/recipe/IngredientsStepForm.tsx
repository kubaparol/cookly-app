import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { cn } from '@/utils';

import { units } from '@/constants';

import { InputNumeric } from '@/components/base/InputNumeric';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '../../ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { IngredientsStepFormValues } from './schemas';

export default function IngredientsStepForm() {
  const { control } = useFormContext<IngredientsStepFormValues>();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index !== result.source.index) {
      move(result.source.index, result.destination.index);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingredients List</CardTitle>
        <CardDescription>Add all ingredients with their quantities and units</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[160px]">Quantity</TableHead>
                <TableHead className="w-[100px]">Unit</TableHead>
                <TableHead className="w-[150px]">Ingredient</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>

            <Droppable droppableId="ingredients-list">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided, snapshot) => (
                        <TableRow
                          key={field.id}
                          ref={provided.innerRef}
                          className={cn(snapshot.isDragging && 'bg-muted-foreground/10')}
                          {...provided.draggableProps}>
                          <TableCell className="w-fit min-w-[50px]">
                            <div
                              className="flex cursor-grab items-center justify-center"
                              {...provided.dragHandleProps}>
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </TableCell>

                          <TableCell className="w-fit min-w-[160px]">
                            <FormField
                              control={control}
                              name={`ingredients.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <InputNumeric
                                      {...field}
                                      mode="natural"
                                      min={0}
                                      step={1}
                                      placeholder="e.g., 2"
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="w-fit min-w-[100px]">
                            <FormField
                              control={control}
                              name={`ingredients.${index}.unit`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}>
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
                          </TableCell>

                          <TableCell className="w-full min-w-[150px]">
                            <FormField
                              control={control}
                              name={`ingredients.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="e.g., all-purpose flour"
                                      className="w-full"
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="w-full min-w-[50px]">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => remove(index)}>
                              <Trash2 className="h-5 w-5" />
                              <span className="sr-only">Remove step</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ quantity: '', unit: '', name: '' })}
            className="w-fit">
            <Plus className="mr-2 h-4 w-4" />
            Add Ingredient
          </Button>
        </DragDropContext>

        <div className="rounded-lg border bg-muted p-4">
          <h3 className="mb-2 font-medium">Ingredient Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              List ingredients in the order they&apos;ll be used
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Be specific about sizes (e.g., &quot;large eggs&quot; instead of just
              &quot;eggs&quot;)
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Include preparation instructions if needed (e.g., &quot;onion, diced&quot;)
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Group ingredients by section if your recipe has multiple parts
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
