import { PlusCircle, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { allergens, costLevels, dietaryTags, difficultyLevels, seasons } from '@/constants';

import { Button } from '../../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { MultiSelect } from '../../ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { AdditionalDetailsStepFormValues } from './schemas';

export default function AdditionalDetailsStepForm() {
  const { control, watch, setValue } = useFormContext<AdditionalDetailsStepFormValues>();

  const equipment = watch('equipment') || [];
  const substitutions = watch('substitutions') || [];
  const tipsAndTricks = watch('tipsAndTricks') || [];

  const {
    fields: substitutionFields,
    append: appendSubstitution,
    remove: removeSubstitution,
  } = useFieldArray({
    control,
    name: 'substitutions',
  });

  const {
    fields: tipFields,
    append: appendTip,
    remove: removeTip,
  } = useFieldArray({
    control,
    name: 'tipsAndTricks',
  });

  const handleAddEquipment = () => {
    setValue('equipment', [...equipment, '']);
  };

  const handleRemoveEquipment = (index: number) => {
    setValue(
      'equipment',
      equipment.filter((_, i) => i !== index),
    );
  };

  const handleEquipmentChange = (index: number, value: string) => {
    const newEquipment = [...equipment];
    newEquipment[index] = value;
    setValue('equipment', newEquipment);
  };

  const handleSubstitutionChange = (
    index: number,
    field: 'original' | 'substitute',
    value: string,
  ) => {
    const newSubstitutions = [...substitutions];
    newSubstitutions[index] = { ...newSubstitutions[index], [field]: value };
    setValue('substitutions', newSubstitutions);
  };

  const handleTipChange = (index: number, value: string) => {
    const newTips = [...tipsAndTricks];
    newTips[index] = { description: value };
    setValue('tipsAndTricks', newTips);
  };

  return (
    <div className="grid h-fit gap-5">
      <div className="grid grid-cols-1 gap-4 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-2">
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
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
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
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Equipment Needed</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleAddEquipment}>
              <PlusCircle className="h-4 w-4" />
              Add Equipment
            </Button>
          </div>

          {equipment.map((item, index) => (
            <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr,auto]">
              <FormControl>
                <Input
                  placeholder="e.g., Blender, Food processor"
                  value={item}
                  onChange={(e) => handleEquipmentChange(index, e.target.value)}
                />
              </FormControl>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => handleRemoveEquipment(index)}>
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Remove equipment</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
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

      <div className="rounded-lg border bg-card p-4 shadow-sm">
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
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <FormField
          control={control}
          name="nutritionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nutritional Information (per serving)</FormLabel>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Calories"
                    value={field.value?.calories || ''}
                    onChange={(e) => field.onChange({ ...field.value, calories: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="Protein (g)"
                    value={field.value?.protein || ''}
                    onChange={(e) => field.onChange({ ...field.value, protein: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="Carbs (g)"
                    value={field.value?.carbs || ''}
                    onChange={(e) => field.onChange({ ...field.value, carbs: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="Fat (g)"
                    value={field.value?.fat || ''}
                    onChange={(e) => field.onChange({ ...field.value, fat: e.target.value })}
                  />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
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
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
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
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
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

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Substitutions</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => appendSubstitution({ original: '', substitute: '' })}>
              <PlusCircle className="h-4 w-4" />
              Add Substitution
            </Button>
          </div>

          {substitutionFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr,1fr,auto]">
              <FormControl>
                <Input
                  placeholder="Original ingredient"
                  value={substitutions[index]?.original || ''}
                  onChange={(e) => handleSubstitutionChange(index, 'original', e.target.value)}
                />
              </FormControl>

              <FormControl>
                <Input
                  placeholder="Substitute"
                  value={substitutions[index]?.substitute || ''}
                  onChange={(e) => handleSubstitutionChange(index, 'substitute', e.target.value)}
                />
              </FormControl>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => removeSubstitution(index)}>
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Remove substitution</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Tips & Tricks</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => appendTip({ description: '' })}>
              <PlusCircle className="h-4 w-4" />
              Add Tip
            </Button>
          </div>

          {tipFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr,auto]">
              <FormControl>
                <Input
                  placeholder="Enter a cooking tip"
                  value={tipsAndTricks[index]?.description || ''}
                  onChange={(e) => handleTipChange(index, e.target.value)}
                />
              </FormControl>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => removeTip(index)}>
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Remove tip</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
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
                  className="min-h-[100px]"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
