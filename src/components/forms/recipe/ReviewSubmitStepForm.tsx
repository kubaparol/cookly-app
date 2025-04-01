import { CalendarClock, ChefHat, Coffee, DollarSign, Save, Upload } from 'lucide-react';
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
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { getTotalCookingTime } from '@/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { RecipeFormValues } from './schemas';

export default function ReviewSubmitStepForm() {
  const { control, watch } = useFormContext<RecipeFormValues>();

  const [publishOption, setPublishOption] = useState<'public' | 'draft'>('public');

  const formValues = watch();

  const totalTime = getTotalCookingTime({
    preparationTime: formValues.preparationTime,
    cookingTime: formValues.cookingTime,
    restTime: formValues.restTime,
  });

  // const user = useUser();

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
                <Image
                  src={formValues.imageUrl}
                  alt={formValues.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formValues.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>

                <h2 className="text-xl font-semibold">{formValues.title}</h2>

                {formValues.description && (
                  <p className="text-muted-foreground">{formValues.description}</p>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <Clock className="mb-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{totalTime} min</span>
                    <span className="text-xs text-muted-foreground">Total Time</span>
                  </div>

                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <ChefHat className="mb-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{formValues.difficulty}</span>
                    <span className="text-xs text-muted-foreground">Difficulty</span>
                  </div>

                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <Users className="mb-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{formValues.servings}</span>
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
                      <span className="text-sm font-medium">{formValues.preparationTime} min</span>
                      <span className="text-xs text-muted-foreground">Prep Time</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {formValues.dietaryTags?.map((tag) => (
                    <Badge
                      key={tag}
                      className="border-0 bg-green-950/30 text-xs text-green-700 hover:bg-green-950/50">
                      <Leaf className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}

                  {formValues.allergens?.map((allergen) => (
                    <Badge
                      key={allergen}
                      variant="outline"
                      className="border-red-900/30 bg-red-950/30 text-xs text-red-300 hover:bg-red-950/50">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      {allergen}
                    </Badge>
                  ))}
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
                      {formValues.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary/30">
                            <div className="h-2.5 w-2.5 rounded-full bg-primary/30"></div>
                          </div>
                          <span className="text-sm">
                            <span className="font-medium">
                              {ingredient.quantity} {ingredient.unit}
                            </span>{' '}
                            {ingredient.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 flex items-center text-lg font-medium">
                      <Utensils className="mr-2 h-5 w-5 text-muted-foreground" />
                      Equipment
                    </h3>
                    <ul className="space-y-2">
                      {formValues.equipment.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary/30">
                            <div className="h-2.5 w-2.5 rounded-full bg-primary/30"></div>
                          </div>
                          <span className="text-sm">{item.name}</span>
                        </li>
                      ))}
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
                  {formValues.steps.map((step, index) => (
                    <div key={index} className="group flex">
                      <div className="mr-3 flex-shrink-0">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 font-semibold text-foreground">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
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

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="nutrition">
            <AccordionTrigger>
              <div className="flex items-center">
                <Flame className="mr-2 h-4 w-4" />
                Nutrition Information
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4 p-2 sm:grid-cols-4">
                {formValues.calories && (
                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <span className="text-xs text-muted-foreground">Calories</span>
                    <span className="text-lg font-semibold">{formValues.calories}</span>
                  </div>
                )}

                {formValues.protein && (
                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <span className="text-xs text-muted-foreground">Protein</span>
                    <span className="text-lg font-semibold">{formValues.protein}g</span>
                  </div>
                )}

                {formValues.carbs && (
                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <span className="text-xs text-muted-foreground">Carbs</span>
                    <span className="text-lg font-semibold">{formValues.carbs}g</span>
                  </div>
                )}

                {formValues.fat && (
                  <div className="flex flex-col items-center rounded-md bg-muted/30 p-2 text-center">
                    <span className="text-xs text-muted-foreground">Fat</span>
                    <span className="text-lg font-semibold">{formValues.fat}g</span>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="metadata">
            <AccordionTrigger>
              <div className="flex items-center">
                <Info className="mr-2 h-4 w-4" />
                Recipe Metadata
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="col-span-1">
                  <dt className="flex items-center text-muted-foreground">
                    <Coffee className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    Cuisine:
                  </dt>
                  <dd className="font-medium">{formValues.cuisineType}</dd>
                </div>

                <div className="col-span-1">
                  <dt className="flex items-center text-muted-foreground">
                    <Utensils className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    Meal Type:
                  </dt>
                  <dd className="font-medium">{formValues.mealType}</dd>
                </div>

                <div className="col-span-1">
                  <dt className="flex items-center text-muted-foreground">
                    <Clock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    Prep Time:
                  </dt>
                  <dd className="font-medium">{formValues.preparationTime} min</dd>
                </div>

                <div className="col-span-1">
                  <dt className="flex items-center text-muted-foreground">
                    <Flame className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    Cook Time:
                  </dt>
                  <dd className="font-medium">{formValues.cookingTime} min</dd>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Submission Panel */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Publish Settings</CardTitle>
            <CardDescription>Choose how you want to publish your recipe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Visibility</Label>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`cursor-pointer rounded-md border p-3 transition-colors ${
                    publishOption === 'public' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setPublishOption('public')}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">Public</span>
                    {publishOption === 'public' && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Visible to everyone on Recipe Hub</p>
                </div>

                <div
                  className={`cursor-pointer rounded-md border p-3 transition-colors ${
                    publishOption === 'draft' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setPublishOption('draft')}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">draft</span>
                    {publishOption === 'draft' && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Only visible to you</p>
                </div>
              </div>
            </div>

            {/* {completenessPercentage < 100 && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" />
                    <div>
                      <h4 className="text-sm font-medium">Recipe Incomplete</h4>
                      <p className="text-xs mt-1">
                        Your recipe is missing some recommended information. You can still publish it, but completing
                        all fields will improve discoverability.
                      </p>
                    </div>
                  </div>
                </div>
              )} */}

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
                        <Link href="#" className="text-primary underline underline-offset-2">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="text-primary underline underline-offset-2">
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
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Publish Recipe
            </Button>

            <Button variant="outline" className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recipe Checklist</CardTitle>
            <CardDescription>Ensure your recipe is complete</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div
                  className={`mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    formValues.title
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                  {formValues.title ? <Check className="h-3 w-3" /> : '1'}
                </div>
                <span className="text-sm">Basic information (title, description, image)</span>
              </li>

              <li className="flex items-start">
                <div
                  className={`mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    formValues.ingredients.length > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                  {formValues.ingredients.length > 0 ? <Check className="h-3 w-3" /> : '2'}
                </div>
                <span className="text-sm">
                  Ingredients list ({formValues.ingredients.length} items)
                </span>
              </li>

              <li className="flex items-start">
                <div
                  className={`mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    formValues.steps.length > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                  {formValues.steps.length > 0 ? <Check className="h-3 w-3" /> : '3'}
                </div>
                <span className="text-sm">Instructions ({formValues.steps.length} steps)</span>
              </li>

              <li className="flex items-start">
                <div
                  className={`mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    formValues.preparationTime && formValues.cookingTime
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                  {formValues.preparationTime && formValues.cookingTime ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    '4'
                  )}
                </div>
                <span className="text-sm">Timing information</span>
              </li>

              <li className="flex items-start">
                <div
                  className={`mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    formValues.servings
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                  {formValues.servings ? <Check className="h-3 w-3" /> : '5'}
                </div>
                <span className="text-sm">Servings information</span>
              </li>

              <li className="flex items-start">
                <div
                  className={`mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    formValues.cuisineType && formValues.mealType
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                  {formValues.cuisineType && formValues.mealType ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    '6'
                  )}
                </div>
                <span className="text-sm">Cuisine and meal type</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
