import {
  CalendarClock,
  ChefHat,
  Coffee,
  DollarSign,
  ImageIcon,
  Loader2,
  Save,
  Upload,
  XIcon,
} from 'lucide-react';
import {
  AlertCircle,
  BookOpen,
  Check,
  Flame,
  Info,
  Leaf,
  Scale,
  Timer,
  Users,
  Utensils,
} from 'lucide-react';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { cn, getTotalCookingTime } from '@/utils';

import { ProjectUrls } from '@/constants';

import { createRecipe, updateRecipe } from '@/db';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Checkbox } from '../../ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { useRecipeFormSteps } from './hooks/use-recipe-form-steps';
import { RecipeFormValues } from './schemas';

// Add this mapper function after the import statements and before the checkStepValidation function
export const checkStepValidation = (formValues: RecipeFormValues, schema: any) => {
  try {
    schema.parse(formValues);
    return true;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

interface ReviewSubmitStepFormProps {
  formType: 'Create' | 'Update';
  recipeId?: string;
}

export default function ReviewSubmitStepForm({ formType, recipeId }: ReviewSubmitStepFormProps) {
  const { control, watch } = useFormContext<RecipeFormValues>();
  const { steps } = useRecipeFormSteps();

  const [publishOption, setPublishOption] = useState<'public' | 'draft'>('public');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValues = watch();
  const router = useRouter();

  const totalTime = getTotalCookingTime({
    preparationTime: formValues.preparationTime,
    cookingTime: formValues.cookingTime,
    restTime: formValues.restTime,
  });

  const stepValidations = steps.map((step) => {
    return {
      name: step.name,
      isValid: checkStepValidation(formValues, step.schema),
    };
  });

  const validStepsCount = stepValidations.filter((step) => step.isValid).length;
  const completionPercentage = Math.round((validStepsCount / steps.length) * 100);

  const handleSubmitRecipe = async () => {
    const formData = watch();

    setIsSubmitting(true);

    try {
      let result;

      if (formType === 'Create') {
        result = await createRecipe({
          ...formData,
          status: publishOption === 'public' ? 'published' : 'draft',
          canBePublished: completionPercentage === 100,
        });
      } else if (formType === 'Update' && recipeId) {
        result = await updateRecipe({
          ...formData,
          id: recipeId,
          status: publishOption === 'public' ? 'published' : 'draft',
          canBePublished: completionPercentage === 100,
        });
      } else {
        throw new Error('Invalid form type or missing recipe ID for update');
      }

      if (result.success) {
        toast.success(
          formType === 'Create'
            ? publishOption === 'public'
              ? 'Recipe published successfully!'
              : 'Recipe saved as draft'
            : publishOption === 'public'
              ? 'Recipe updated and published!'
              : 'Recipe updated as draft',
        );

        router.push(ProjectUrls.myRecipes);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(`Failed to ${formType.toLowerCase()} recipe: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Recipe Preview */}
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recipe Details</CardTitle>
            <CardDescription>Review the basic information about your recipe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recipe Header */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md md:w-1/3">
                {formValues.imageUrl ? (
                  <Image
                    src={formValues.imageUrl}
                    alt={formValues.title || 'Recipe image'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formValues.categories && formValues.categories.length > 0 ? (
                    formValues.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No categories selected</span>
                  )}
                </div>

                <h2 className="text-xl font-semibold">{formValues.title || 'Untitled Recipe'}</h2>

                {formValues.description ? (
                  <p className="text-muted-foreground">{formValues.description}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">No description provided</p>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <Clock className="mb-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {totalTime ? `${totalTime} min` : '-'}
                    </span>
                    <span className="text-xs text-muted-foreground">Total Time</span>
                  </div>

                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <ChefHat className="mb-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{formValues.difficulty || '-'}</span>
                    <span className="text-xs text-muted-foreground">Difficulty</span>
                  </div>

                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <Users className="mb-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{formValues.servings || '-'}</span>
                    <span className="text-xs text-muted-foreground">Servings</span>
                  </div>

                  {formValues.calories ? (
                    <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                      <Flame className="mb-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{formValues.calories}</span>
                      <span className="text-xs text-muted-foreground">Calories</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                      <Timer className="mb-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {formValues.preparationTime ? `${formValues.preparationTime} min` : '-'}
                      </span>
                      <span className="text-xs text-muted-foreground">Prep Time</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {formValues.dietaryTags && formValues.dietaryTags.length > 0 ? (
                    formValues.dietaryTags.map((tag) => (
                      <Badge
                        key={tag}
                        className="border-0 bg-green-950/30 text-xs text-green-700 hover:bg-green-950/50">
                        <Leaf className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No dietary tags</span>
                  )}

                  {formValues.allergens && formValues.allergens.length > 0
                    ? formValues.allergens.map((allergen) => (
                        <Badge
                          key={allergen}
                          variant="outline"
                          className="border-red-900/30 bg-red-950/30 text-xs text-red-300 hover:bg-red-950/50">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          {allergen}
                        </Badge>
                      ))
                    : null}
                </div>
              </div>
            </div>

            <Separator />

            {/* Recipe Content Tabs */}
            <Tabs defaultValue="ingredients">
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="ingredients">
                  <Scale className="mr-2 h-4 w-4" />
                  Ingredients
                </TabsTrigger>
                <TabsTrigger value="instructions">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Instructions
                </TabsTrigger>
                <TabsTrigger value="additional">
                  <Info className="mr-2 h-4 w-4" />
                  Additional Info
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ingredients" className="space-y-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 flex items-center text-lg font-medium">
                      <Scale className="mr-2 h-5 w-5 text-muted-foreground" />
                      Ingredients
                    </h3>
                    <p className="mb-4 text-xs text-muted-foreground">
                      {formValues.servings} servings
                      {formValues.servingSize ? ` (${formValues.servingSize} per serving)` : ''}
                    </p>
                    <ul className="space-y-2">
                      {formValues.ingredients && formValues.ingredients.length > 0 ? (
                        formValues.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary/30">
                              <div className="h-2.5 w-2.5 rounded-full bg-primary/30"></div>
                            </div>
                            <span className="text-sm">
                              <span className="font-medium">
                                {ingredient.quantity || '-'} {ingredient.unit || ''}
                              </span>{' '}
                              {ingredient.name || 'Unnamed ingredient'}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">No ingredients added yet</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 flex items-center text-lg font-medium">
                      <Utensils className="mr-2 h-5 w-5 text-muted-foreground" />
                      Equipment
                    </h3>
                    <ul className="space-y-2">
                      {formValues.equipment && formValues.equipment.length > 0 ? (
                        formValues.equipment.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary/30">
                              <div className="h-2.5 w-2.5 rounded-full bg-primary/30"></div>
                            </div>
                            <span className="text-sm">{item.name || 'Unnamed equipment'}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">No equipment added yet</li>
                      )}
                    </ul>

                    {formValues.substitutions.length > 0 && (
                      <div className="mt-6">
                        <h3 className="mb-3 text-lg font-medium">Substitutions</h3>
                        <ul className="space-y-2">
                          {formValues.substitutions.map((sub, index) => (
                            <li key={index} className="text-sm">
                              <span className="font-medium">{sub.original}:</span> {sub.substitute}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instructions" className="space-y-4">
                <h3 className="mb-3 flex items-center text-lg font-medium">
                  <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
                  Instructions
                </h3>

                <div className="space-y-4">
                  {formValues.steps && formValues.steps.length > 0 ? (
                    formValues.steps.map((step, index) => (
                      <div key={index} className="group flex">
                        <div className="mr-3 flex-shrink-0">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 font-semibold text-foreground">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm">{step.description || 'No description provided'}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No instructions added yet</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="additional" className="space-y-6">
                {formValues.tipsAndTricks.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-medium">Chef&apos;s Tips</h3>
                    <ul className="space-y-2">
                      {formValues.tipsAndTricks.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">{tip.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(formValues.storageInstructions ||
                  formValues.reheatingInstructions ||
                  formValues.makeAheadInstructions) && (
                  <div>
                    <h3 className="mb-3 text-lg font-medium">Storage & Preparation</h3>
                    <div className="space-y-3">
                      {formValues.storageInstructions && (
                        <div className="flex">
                          <div className="mr-3 flex-shrink-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <CalendarClock className="h-4 w-4" />
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-1 text-sm font-medium">Storage</h4>
                            <p className="text-sm text-muted-foreground">
                              {formValues.storageInstructions}
                            </p>
                          </div>
                        </div>
                      )}

                      {formValues.reheatingInstructions && (
                        <div className="flex">
                          <div className="mr-3 flex-shrink-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Flame className="h-4 w-4" />
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-1 text-sm font-medium">Reheating</h4>
                            <p className="text-sm text-muted-foreground">
                              {formValues.reheatingInstructions}
                            </p>
                          </div>
                        </div>
                      )}

                      {formValues.makeAheadInstructions && (
                        <div className="flex">
                          <div className="mr-3 flex-shrink-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Clock className="h-4 w-4" />
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-1 text-sm font-medium">Make Ahead</h4>
                            <p className="text-sm text-muted-foreground">
                              {formValues.makeAheadInstructions}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {formValues.notes && (
                  <div>
                    <h3 className="mb-3 text-lg font-medium">Chef&apos;s Notes</h3>
                    <div className="flex">
                      <div className="mr-3 flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Info className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{formValues.notes}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
            <span className="text-xs text-muted-foreground">Calories</span>
            <span className="text-lg font-semibold">{formValues.calories || '-'}</span>
          </div>

          <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
            <span className="text-xs text-muted-foreground">Protein</span>
            <span className="text-lg font-semibold">
              {formValues.protein ? `${formValues.protein}g` : '-'}
            </span>
          </div>

          <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
            <span className="text-xs text-muted-foreground">Carbs</span>
            <span className="text-lg font-semibold">
              {formValues.carbs ? `${formValues.carbs}g` : '-'}
            </span>
          </div>

          <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
            <span className="text-xs text-muted-foreground">Fat</span>
            <span className="text-lg font-semibold">
              {formValues.fat ? `${formValues.fat}g` : '-'}
            </span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="col-span-1">
            <dt className="flex items-center text-muted-foreground">
              <Coffee className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
              Cuisine:
            </dt>
            <dd className="font-medium">{formValues.cuisineType || '-'}</dd>
          </div>

          <div className="col-span-1">
            <dt className="flex items-center text-muted-foreground">
              <Utensils className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
              Meal Type:
            </dt>
            <dd className="font-medium">{formValues.mealType || '-'}</dd>
          </div>

          <div className="col-span-1">
            <dt className="flex items-center text-muted-foreground">
              <Clock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
              Prep Time:
            </dt>
            <dd className="font-medium">
              {formValues.preparationTime ? `${formValues.preparationTime} min` : '-'}
            </dd>
          </div>

          <div className="col-span-1">
            <dt className="flex items-center text-muted-foreground">
              <Flame className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
              Cook Time:
            </dt>
            <dd className="font-medium">
              {formValues.cookingTime ? `${formValues.cookingTime} min` : '-'}
            </dd>
          </div>

          {formValues.restTime && (
            <div className="col-span-1">
              <dt className="flex items-center text-muted-foreground">
                <Timer className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                Rest Time:
              </dt>
              <dd className="font-medium">{formValues.restTime} min</dd>
            </div>
          )}

          {formValues.activeTime && (
            <div className="col-span-1">
              <dt className="flex items-center text-muted-foreground">
                <Clock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                Active Time:
              </dt>
              <dd className="font-medium">{formValues.activeTime} min</dd>
            </div>
          )}

          {formValues.yield && (
            <div className="col-span-1">
              <dt className="flex items-center text-muted-foreground">
                <Scale className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                Yield:
              </dt>
              <dd className="font-medium">{formValues.yield}</dd>
            </div>
          )}

          {formValues.costLevel && (
            <div className="col-span-1">
              <dt className="flex items-center text-muted-foreground">
                <DollarSign className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                Cost Level:
              </dt>
              <dd className="font-medium">{formValues.costLevel}</dd>
            </div>
          )}

          {formValues.seasonality && (
            <div className="col-span-1">
              <dt className="flex items-center text-muted-foreground">
                <CalendarClock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                Seasonality:
              </dt>
              <dd className="font-medium">{formValues.seasonality}</dd>
            </div>
          )}
        </dl>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Recipe Checklist</CardTitle>
          <CardDescription>Validation status: {completionPercentage}% complete</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {stepValidations.slice(0, -1).map((step, index) => (
              <li key={index} className="flex items-start">
                <div
                  className={cn(
                    'mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                    step.isValid &&
                      'border border-green-400/30 bg-green-400/10 text-xs text-green-400 dark:border-green-300/50 dark:bg-green-300/20 dark:text-green-300',
                    !step.isValid &&
                      'border border-red-400/30 bg-red-400/10 text-xs text-red-400 dark:border-red-300/50 dark:bg-red-300/20 dark:text-red-300',
                  )}>
                  {step.isValid ? <Check className="h-3 w-3" /> : <XIcon className="h-3 w-3" />}
                </div>

                <div className="flex w-full flex-col space-y-1">
                  <span className="text-sm font-medium">{step.name}</span>

                  {!step.isValid && (
                    <div className="space-y-1">
                      <div className="ml-0 mt-1 rounded-md bg-red-50 p-2 text-xs text-red-600 dark:bg-red-950/20">
                        <div className="flex items-start">
                          <span className="mr-1">•</span>
                          <span>Required fields are missing. Please complete this section.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}

            <li className="flex items-start">
              <div
                className={cn(
                  'mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                  formValues.termsAccepted &&
                    'border border-green-400/30 bg-green-400/10 text-xs text-green-400 dark:border-green-300/50 dark:bg-green-300/20 dark:text-green-300',
                  !formValues.termsAccepted &&
                    'border border-yellow-400/30 bg-yellow-400/10 text-xs text-yellow-400 dark:border-yellow-300/50 dark:bg-yellow-300/20 dark:text-yellow-300',
                )}>
                {formValues.termsAccepted ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <AlertCircle className="h-3 w-3" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Terms Acceptance</span>
                {!formValues.termsAccepted && (
                  <span className="text-xs text-amber-600">Please accept the terms to publish</span>
                )}
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Submission Panel */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Publish Settings</CardTitle>
            <CardDescription>Choose how you want to publish your recipe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>I want to:</Label>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`cursor-pointer rounded-md border p-3 transition-colors ${
                    publishOption === 'public' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setPublishOption('public')}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">Publish Now</span>
                    {publishOption === 'public' && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Make it visible to everyone on Recipe Hub
                  </p>
                </div>

                <div
                  className={`cursor-pointer rounded-md border p-3 transition-colors ${
                    publishOption === 'draft' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setPublishOption('draft')}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">Save as Draft</span>
                    {publishOption === 'draft' && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Only visible to you</p>
                </div>
              </div>
            </div>

            {completionPercentage < 100 && (
              <div className="rounded-md border border-orange-400 bg-orange-400/10 p-3 text-xs text-orange-900 dark:border-orange-300/50 dark:bg-orange-300/20 dark:text-orange-300">
                <div className="flex items-start">
                  <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0 text-orange-400 dark:text-orange-300" />
                  <div>
                    <h4 className="text-sm font-medium">
                      Recipe Incomplete ({completionPercentage}% complete)
                    </h4>
                    <p className="mt-1 text-xs">
                      Your recipe is missing some required information. You can still save as draft,
                      but you need to complete all required fields to publish.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <FormField
                control={control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>

                    <div className="space-y-2 leading-none">
                      <FormLabel>
                        I confirm that this recipe is my own creation or I have permission to share
                        it, and I accept the{' '}
                        <Link href="#" className="underline underline-offset-2">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="underline underline-offset-2">
                          Content Guidelines
                        </Link>
                        .
                      </FormLabel>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={publishOption === 'public' ? 'default' : 'outline'}
              onClick={handleSubmitRecipe}
              disabled={
                (publishOption === 'public' &&
                  (completionPercentage < 100 || !formValues.termsAccepted)) ||
                isSubmitting
              }>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {formType === 'Create' ? 'Creating...' : 'Updating...'}
                </>
              ) : publishOption === 'public' ? (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {formType === 'Create' ? 'Publish Recipe' : 'Update & Publish Recipe'}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {formType === 'Create' ? 'Save as Draft' : 'Update as Draft'}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
