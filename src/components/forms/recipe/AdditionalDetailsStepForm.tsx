import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { GripVertical, Plus, PlusCircle, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { allergens, costLevels, dietaryTags, difficultyLevels, seasons } from '@/constants';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { InputNumeric } from '../../base/InputNumeric';
import { Button } from '../../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { MultiSelect } from '../../ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { AdditionalDetailsStepFormValues } from './schemas';

export default function AdditionalDetailsStepForm() {
  const { control } = useFormContext<AdditionalDetailsStepFormValues>();

  const {
    fields: substitutionFields,
    append: appendSubstitution,
    remove: removeSubstitution,
    move: moveSubstitution,
  } = useFieldArray({
    control,
    name: 'substitutions',
  });

  const {
    fields: tipFields,
    append: appendTip,
    remove: removeTip,
    move: moveTip,
  } = useFieldArray({
    control,
    name: 'tipsAndTricks',
  });

  const {
    fields: equipmentFields,
    append: appendEquipment,
    remove: removeEquipment,
    move: moveEquipment,
  } = useFieldArray({
    control,
    name: 'equipment',
  });

  const handleSubstitutionsDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index !== result.source.index) {
      moveSubstitution(result.source.index, result.destination.index);
    }
  };

  const handleTipsDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index !== result.source.index) {
      moveTip(result.source.index, result.destination.index);
    }
  };

  const handleEquipmentDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index !== result.source.index) {
      moveEquipment(result.source.index, result.destination.index);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recipe Attributes</CardTitle>
          <CardDescription>
            Specify key attributes to help users find and understand your recipe
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-[18px] text-red-500">*</span>
                    Difficulty Level
                  </FormLabel>

                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue {...field} placeholder="e.g., Easy" />
                      </SelectTrigger>

                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
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
              name="seasonality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Best Season</FormLabel>

                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue {...field} placeholder="e.g., Summer" />
                      </SelectTrigger>

                      <SelectContent>
                        {seasons.map((season) => (
                          <SelectItem key={season.value} value={season.value}>
                            {season.label}
                          </SelectItem>
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
              name="costLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Level</FormLabel>

                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue {...field} placeholder="e.g., Budget-friendly" />
                      </SelectTrigger>

                      <SelectContent>
                        {costLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
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
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="e.g., This recipe can be made ahead and reheated."
                      rows={4}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dietary Information</CardTitle>
          <CardDescription>Help users with dietary restrictions find your recipe</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={control}
              name="dietaryTags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-[18px] text-red-500">*</span>
                    Dietary Tags
                  </FormLabel>

                  <FormControl>
                    <MultiSelect
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      options={dietaryTags}
                      placeholder="e.g., Vegetarian"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="allergens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergens</FormLabel>

                  <FormControl>
                    <MultiSelect
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      options={allergens}
                      placeholder="e.g., Nuts, Dairy"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Nutrition Information (Optional)</h3>
            <p className="text-sm text-muted-foreground">
              Providing nutrition information helps users make informed choices
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <FormField
              control={control}
              name="calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories</FormLabel>

                  <FormControl>
                    <InputNumeric
                      {...field}
                      placeholder="Calories"
                      mode="natural"
                      min={0}
                      step={1}
                      unit="kcal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="protein"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Protein</FormLabel>
                  <FormControl>
                    <InputNumeric
                      {...field}
                      placeholder="Protein (g)"
                      mode="natural"
                      min={0}
                      step={1}
                      unit="g"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="carbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carbs</FormLabel>

                  <FormControl>
                    <InputNumeric
                      {...field}
                      placeholder="Carbs (g)"
                      mode="natural"
                      min={0}
                      step={1}
                      unit="g"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="fat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fat</FormLabel>

                  <FormControl>
                    <InputNumeric
                      {...field}
                      placeholder="Fat (g)"
                      mode="natural"
                      min={0}
                      step={1}
                      unit="g"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Accordion
        type="multiple"
        defaultValue={['equipment', 'storage', 'substitutions', 'tips']}
        className="w-full">
        <AccordionItem value="equipment">
          <AccordionTrigger>Equipment</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                List the equipment needed to prepare this recipe
              </p>

              <DragDropContext onDragEnd={handleEquipmentDragEnd}>
                <Droppable droppableId="equipment">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {equipmentFields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center gap-2 rounded-md border p-2">
                              <div {...provided.dragHandleProps} className="cursor-grab">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                              </div>

                              <FormField
                                control={control}
                                name={`equipment.${index}.name`}
                                render={({ field }) => (
                                  <FormItem className="w-full">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="e.g., Blender, Food processor"
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeEquipment(index)}
                                className="h-8 w-8">
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Button
                type="button"
                variant="outline"
                onClick={() => appendEquipment({ name: '' })}
                size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Equipment
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="storage">
          <AccordionTrigger>Storage & Make Ahead</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <FormField
                control={control}
                name="storageInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage Instructions</FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g., Store in an airtight container in the refrigerator for up to 3 days."
                        className="min-h-[100px]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="reheatingInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reheating Instructions</FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g., Microwave on high for 2-3 minutes, stirring halfway through."
                        className="min-h-[100px]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="makeAheadInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make-Ahead Instructions</FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g., Can be prepared up to 24 hours in advance. Store in the refrigerator and bring to room temperature before serving."
                        className="min-h-[100px]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="substitutions">
          <AccordionTrigger>Substitutions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Suggest ingredient substitutions for dietary restrictions or availability
              </p>

              <DragDropContext onDragEnd={handleSubstitutionsDragEnd}>
                <Droppable droppableId="substitutions">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {substitutionFields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center gap-2 rounded-md border p-2">
                              <div {...provided.dragHandleProps} className="cursor-grab">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                              </div>

                              <div className="grid flex-1 grid-cols-2 gap-2">
                                <FormField
                                  control={control}
                                  name={`substitutions.${index}.original`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input {...field} placeholder="Original Ingredient" />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={control}
                                  name={`substitutions.${index}.substitute`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input {...field} placeholder="Substitute Ingredient" />
                                      </FormControl>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSubstitution(index)}
                                className="h-8 w-8">
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Button
                type="button"
                variant="outline"
                onClick={() => appendSubstitution({ original: '', substitute: '' })}
                size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Substitution
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tips">
          <AccordionTrigger>Tips & Tricks</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Share helpful tips to make this recipe a success
              </p>

              <DragDropContext onDragEnd={handleTipsDragEnd}>
                <Droppable droppableId="tips">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {tipFields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-start gap-2 rounded-md border p-2">
                              <div {...provided.dragHandleProps} className="mt-2 cursor-grab">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                              </div>

                              <FormField
                                control={control}
                                name={`tipsAndTricks.${index}.description`}
                                render={({ field }) => (
                                  <FormItem className="w-full">
                                    <FormControl>
                                      <Textarea
                                        {...field}
                                        placeholder="e.g., For best results, let the dough rest for at least 30 minutes."
                                        className="min-h-[100px] w-full resize-y"
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTip(index)}
                                className="h-8 w-8">
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Button
                type="button"
                variant="outline"
                onClick={() => appendTip({ description: '' })}
                size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Tip
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
