import { Clock, HelpCircle, Info } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';

import { getTotalCookingTime } from '@/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { TimeServingsStepFormValues } from './schemas';

export default function TimeServingsStepForm() {
  const { control } = useFormContext<TimeServingsStepFormValues>();

  const preparationTime = useWatch({
    control,
    name: 'preparationTime',
  });

  const cookingTime = useWatch({
    control,
    name: 'cookingTime',
  });

  const restTime = useWatch({
    control,
    name: 'restTime',
  });

  const totalTime = getTotalCookingTime({
    preparationTime,
    cookingTime,
    restTime,
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Time Information
          </CardTitle>
          <CardDescription>
            Help users plan by providing accurate timing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <FormField
                control={control}
                name="preparationTime"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="flex items-center">
                        <span className="text-[18px] text-red-500">*</span>
                        Preparation Time
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                                <HelpCircle className="h-3.5 w-3.5" />
                                <span className="sr-only">Preparation time info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                The time it takes to prepare ingredients before cooking begins
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>

                      <span className="text-sm font-medium">{field.value} min</span>
                    </div>

                    <FormControl>
                      <Slider
                        id="preparationTime"
                        min={0}
                        max={120}
                        step={5}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="cookingTime"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="flex items-center">
                        <span className="text-[18px] text-red-500">*</span>
                        Cooking Time
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                                <HelpCircle className="h-3.5 w-3.5" />
                                <span className="sr-only">Cooking time info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                The time the food spends cooking (on the stove, in the oven, etc.)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>

                      <span className="text-sm font-medium">{field.value} min</span>
                    </div>

                    <FormControl>
                      <Slider
                        id="cookingTime"
                        min={0}
                        max={240}
                        step={5}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="restTime"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="flex items-center">
                        Rest Time
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                                <HelpCircle className="h-3.5 w-3.5" />
                                <span className="sr-only">Rest time info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                The time the food needs to rest before serving (e.g., letting meat
                                rest) (optional)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>

                      {field.value && (
                        <span className="text-sm font-medium">{field.value} min</span>
                      )}
                    </div>

                    <FormControl>
                      <Slider
                        id="restTime"
                        min={0}
                        max={60}
                        step={5}
                        value={[field.value || 0]}
                        onValueChange={(value) =>
                          field.onChange(value[0] === 0 ? undefined : value[0])
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="activeTime"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="flex items-center">
                        Active Time
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                                <HelpCircle className="h-3.5 w-3.5" />
                                <span className="sr-only">Active time info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                The time you need to be actively working on the recipe (optional)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>

                      {field.value && (
                        <span className="text-sm font-medium">{field.value} min</span>
                      )}
                    </div>

                    <FormControl>
                      <Slider
                        id="activeTime"
                        min={0}
                        max={180}
                        step={5}
                        value={[field.value || 0]}
                        onValueChange={(value) =>
                          field.onChange(value[0] === 0 ? undefined : value[0])
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border bg-muted p-4">
                <h3 className="mb-2 flex items-center font-medium">
                  <Info className="mr-2 h-4 w-4" />
                  Total Time
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Preparation</span>
                    <p className="font-medium">{preparationTime} min</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Cooking</span>
                    <p className="font-medium">{cookingTime} min</p>
                  </div>
                  {restTime ? (
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Rest</span>
                      <p className="font-medium">{restTime} min</p>
                    </div>
                  ) : null}
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <p className="font-medium">{totalTime} min</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-notes">Time Notes</Label>
                <p className="text-sm text-muted-foreground">
                  Providing accurate timing helps users plan their cooking. Include prep time,
                  cooking time, and any resting time needed before serving.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Servings Information</CardTitle>
          <CardDescription>
            Specify how many people your recipe serves and portion details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <FormField
                control={control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>
                        <span className="text-[18px] text-red-500">*</span>
                        Number of Servings
                      </FormLabel>

                      <span className="text-sm font-medium">{field.value}</span>
                    </div>

                    <FormControl>
                      <Slider
                        id="servings"
                        min={1}
                        max={20}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>

                    <FormDescription>How many people does this recipe serve?</FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="servingSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serving Size</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder="e.g., 1 cup, 1 slice, 2 tacos" />
                    </FormControl>

                    <FormDescription>Specify the amount per serving (optional)</FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="yield"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yield</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder="e.g., 12 cookies, 1 loaf, 4 cups" />
                    </FormControl>

                    <FormDescription>
                      The total amount this recipe produces (optional)
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border bg-muted p-4">
                <h3 className="mb-2 font-medium">Servings Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Be specific about serving size to help with portion control
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    For baked goods, include both servings and total yield
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Consider providing scaling tips for larger or smaller batches
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <h3 className="mb-2 font-medium text-primary">Did you know?</h3>
                <p className="text-sm text-muted-foreground">
                  Recipes with clear serving information are 60% more likely to be saved by users.
                  It helps them plan meals and shopping more effectively.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
