import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { GripVertical, Plus, Trash2, Upload } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '../../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Textarea } from '../../ui/textarea';
import { PreparationStepsFormValues } from './schemas';

export default function PreparationStepsForm() {
  const { control } = useFormContext<PreparationStepsFormValues>();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'steps',
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
        <CardTitle>Instructions</CardTitle>
        <CardDescription>Add clear, detailed steps for preparing your recipe</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-start gap-3 rounded-md border p-3">
                        <div {...provided.dragHandleProps} className="mt-[6px] cursor-grab">
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <FormField
                            control={control}
                            name={`steps.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  <span className="text-[18px] text-red-500">*</span>
                                  Step {index + 1}
                                </FormLabel>

                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="e.g., In a large pot, bring water to a boil and add salt."
                                    className="min-h-[100px] w-full resize-y"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex gap-2">
                              <Button type="button" variant="outline" size="sm" className="h-8">
                                <Upload className="mr-1 h-3.5 w-3.5" />
                                Add Image
                              </Button>
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => remove(index)}>
                              <Trash2 className="h-5 w-5" />
                              <span className="sr-only">Remove step</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ description: '' })}
                  className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="rounded-lg border bg-muted p-4">
          <h3 className="mb-2 font-medium">Writing Great Instructions</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Be clear and specific about techniques
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Include visual cues (e.g., &quot;cook until golden brown&quot;)
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Mention cooking temperatures and times
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Break complex steps into smaller ones
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Add images to illustrate tricky techniques
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
