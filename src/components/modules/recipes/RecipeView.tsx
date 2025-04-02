import {
  AlertCircle,
  BookOpen,
  CalendarClock,
  ChefHat,
  Clock,
  Coffee,
  DollarSign,
  Flame,
  ImageIcon,
  Info,
  Leaf,
  MessageSquare,
  Scale,
  Sparkles,
  Timer,
  Users,
  Utensils,
} from 'lucide-react';
import Image from 'next/image';

import { getTotalCookingTime } from '@/utils';

import { ProjectUrls } from '@/constants';

import { Recipe, addComment } from '@/db';

import { StarRating } from '@/components/base/StarRating';
import { CommentForm, CommentFormValues } from '@/components/forms/CommentForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CommentReply } from '../comments/CommentReply';
import { AddToFavoritesButton } from './AddToFavoritesButton';

type RecipeViewProps =
  | Recipe
  | {
      isFormData: true;
      formData: Partial<Recipe>;
      author?: {
        firstName: string | null;
        lastName: string | null;
        imageUrl: string | null;
      };
    };

export default function RecipeView(props: RecipeViewProps) {
  const isFormData = 'isFormData' in props && props.isFormData;

  const recipe = isFormData
    ? ({
        ...props.formData,
        author: props.author || {
          firstName: 'You',
          lastName: '',
          imageUrl: null,
        },
        createdAt: props.formData.createdAt || new Date(),
        ingredients: props.formData.ingredients || [],
        steps: props.formData.steps || [],
        substitutions: props.formData.substitutions || [],
        tips: props.formData.tips || [],
        equipment: props.formData.equipment || [],
      } as Recipe)
    : (props as Recipe);

  const totalTime = getTotalCookingTime({
    preparationTime: recipe.preparationTime || 0,
    cookingTime: recipe.cookingTime || 0,
    restTime: recipe.restTime || 0,
  });

  const addCommentHandler = async (values: CommentFormValues) => {
    'use server';

    return await addComment({
      ...values,
      recipeId: recipe.id,
    });
  };

  return (
    <>
      {/* Breadcrumb */}
      {!isFormData && (
        <Breadcrumb className="mb-4 text-xs sm:mb-6 sm:text-sm">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={ProjectUrls.home} className="flex items-center">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={ProjectUrls.recipes}>Recipes</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[120px] truncate sm:max-w-[200px]">
                {recipe.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:gap-8 lg:grid-cols-2">
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {recipe.categories?.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs sm:text-sm">
                {category}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            {recipe.title ? recipe.title : 'Untitled Recipe'}
          </h1>

          {recipe.description && (
            <p className="text-base text-muted-foreground sm:text-lg">{recipe.description}</p>
          )}

          <div className="flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm">
            {recipe.author.imageUrl && recipe.author.firstName && recipe.author.lastName && (
              <Avatar className="h-10 w-10 border-2 border-muted sm:h-12 sm:w-12">
                <AvatarImage
                  src={recipe.author.imageUrl}
                  alt={`${recipe.author.firstName} ${recipe.author.lastName}`}
                />
                <AvatarFallback className="bg-muted text-xs text-muted-foreground sm:text-sm">
                  {recipe.author.firstName}
                  {recipe.author.lastName}
                </AvatarFallback>
              </Avatar>
            )}

            <div>
              <p className="text-sm font-medium text-foreground sm:text-base">
                {recipe.author.firstName} {recipe.author.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4 sm:gap-4">
            <div className="flex flex-col items-center rounded-xl border bg-card p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                <Clock className="h-4 w-4 text-foreground sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-base font-semibold text-foreground sm:text-lg">
                {totalTime} min
              </span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">Total Time</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border bg-card p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                <ChefHat className="h-4 w-4 text-foreground sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-base font-semibold text-foreground sm:text-lg">
                {recipe.difficulty}
              </span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">Difficulty</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border bg-card p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                <Users className="h-4 w-4 text-foreground sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-base font-semibold text-foreground sm:text-lg">
                {recipe.servings}
              </span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">Servings</span>
            </div>

            {recipe.calories ? (
              <div className="flex flex-col items-center rounded-xl border bg-card p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                  <Flame className="h-4 w-4 text-foreground sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </div>
                <span className="text-base font-semibold text-foreground sm:text-lg">
                  {recipe.calories}
                </span>
                <span className="text-[10px] text-muted-foreground sm:text-xs">Calories</span>
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-xl border bg-card p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                  <Timer className="h-4 w-4 text-foreground sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </div>
                <span className="text-base font-semibold text-foreground sm:text-lg">
                  {recipe.preparationTime} min
                </span>
                <span className="text-[10px] text-muted-foreground sm:text-xs">Prep Time</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 sm:gap-2">
            {recipe.dietaryTags?.map((tag) => (
              <Badge
                key={tag}
                className="border border-green-400/30 bg-green-400/10 text-xs text-green-400 hover:bg-green-500/20 dark:border-green-300/50 dark:bg-green-300/20 dark:text-green-300">
                <Leaf className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {tag}
              </Badge>
            ))}

            {recipe.allergens?.map((allergen) => (
              <Badge
                key={allergen}
                className="border border-orange-400/30 bg-orange-400/10 text-xs text-orange-400 hover:bg-orange-500/20 dark:border-orange-300/50 dark:bg-orange-300/20 dark:text-orange-300">
                <AlertCircle className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {allergen}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-4 border-card shadow-lg sm:rounded-2xl">
          {recipe.imageUrl ? (
            <Image
              src={recipe.imageUrl}
              alt={recipe.title ? recipe.title : 'Recipe image'}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent"></div>
          <AddToFavoritesButton recipeId={recipe.id} isFavorite={recipe.favorites.length > 0} />
        </div>
      </div>

      {/* Recipe Details */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted p-1">
              <TabsTrigger
                value="ingredients"
                className="rounded-lg text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:text-sm">
                <Scale className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Ingredients</span>
                <span className="xs:hidden">Ingr.</span>
              </TabsTrigger>
              <TabsTrigger
                value="instructions"
                className="rounded-lg text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:text-sm">
                <BookOpen className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Instructions</span>
                <span className="xs:hidden">Instr.</span>
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="rounded-lg text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:text-sm">
                <Info className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Notes & Tips</span>
                <span className="xs:hidden">Notes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="pt-4 sm:pt-6 md:pt-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                <div>
                  <h2 className="mb-3 flex items-center text-xl font-semibold text-foreground sm:mb-4 sm:text-2xl">
                    <Scale className="mr-2 h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
                    Ingredients
                  </h2>
                  <p className="mb-4 text-xs text-muted-foreground sm:mb-6 sm:text-sm">
                    {recipe.servings} servings
                    {recipe.servingSize ? ` (${recipe.servingSize} per serving)` : ''}
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.id} className="flex items-start">
                        <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 sm:mr-3 sm:h-6 sm:w-6">
                          <div className="h-2.5 w-2.5 rounded-full bg-primary/30 sm:h-3 sm:w-3"></div>
                        </div>
                        <span className="text-sm text-foreground sm:text-base">
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
                  <h2 className="mb-3 flex items-center text-xl font-semibold text-foreground sm:mb-4 sm:text-2xl">
                    <Utensils className="mr-2 h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
                    Equipment
                  </h2>
                  <ul className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
                    {recipe.equipment.map((item) => (
                      <li key={item.id} className="flex items-start">
                        <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 sm:mr-3 sm:h-6 sm:w-6">
                          <div className="h-2.5 w-2.5 rounded-full bg-primary/30 sm:h-3 sm:w-3"></div>
                        </div>
                        <span className="text-sm text-foreground sm:text-base">{item.name}</span>
                      </li>
                    ))}
                  </ul>

                  {recipe.substitutions.length > 0 && (
                    <>
                      <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground sm:mb-4 sm:mt-8 sm:text-xl">
                        Substitutions
                      </h3>
                      <Card>
                        <CardContent className="pt-4 sm:pt-6">
                          <ul className="space-y-3 sm:space-y-4">
                            {recipe.substitutions.map((sub) => (
                              <li key={sub.id} className="flex items-start">
                                <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 sm:mr-3 sm:h-6 sm:w-6">
                                  <Sparkles className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" />
                                </div>
                                <span className="text-sm text-foreground sm:text-base">
                                  <span className="font-medium">{sub.original}:</span>{' '}
                                  {sub.substitute}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="instructions" className="pt-4 sm:pt-6 md:pt-8">
              <h2 className="mb-4 flex items-center text-xl font-semibold text-foreground sm:mb-6 sm:text-2xl">
                <BookOpen className="mr-2 h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
                Instructions
              </h2>

              <div className="space-y-6 sm:space-y-8">
                {recipe.steps.map((step) => (
                  <div key={step.id} className="group flex">
                    <div className="mr-3 flex-shrink-0 sm:mr-5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-semibold text-foreground transition-colors group-hover:bg-primary/20 sm:h-10 sm:w-10">
                        {step.order}
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="text-base text-foreground sm:text-lg">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="pt-4 sm:pt-6 md:pt-8">
              <div className="space-y-6 sm:space-y-8 md:space-y-10">
                {recipe.tips.length > 0 && (
                  <div>
                    <h2 className="mb-3 text-xl font-semibold text-foreground sm:mb-4 sm:text-2xl">
                      Chef&apos;s Tips
                    </h2>
                    <Card>
                      <CardContent className="pt-4 sm:pt-6">
                        <ul className="space-y-3 sm:space-y-4">
                          {recipe.tips.map((tip) => (
                            <li key={tip.id} className="flex items-start">
                              <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 sm:mr-3 sm:h-6 sm:w-6">
                                <Sparkles className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" />
                              </div>
                              <span className="text-sm text-foreground sm:text-base">
                                {tip.description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {(recipe.storageInstructions ||
                  recipe.reheatingInstructions ||
                  recipe.makeAheadInstructions) && (
                  <div>
                    <h2 className="mb-3 text-xl font-semibold text-foreground sm:mb-4 sm:text-2xl">
                      Storage & Preparation
                    </h2>
                    <Card>
                      <CardContent className="space-y-4 pt-4 sm:space-y-6 sm:pt-6">
                        {recipe.storageInstructions && (
                          <div className="flex">
                            <div className="mr-3 flex-shrink-0 sm:mr-4">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10">
                                <CalendarClock className="h-4 w-4 sm:h-5 sm:w-5" />
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-1 text-base font-medium text-foreground sm:text-lg">
                                Storage
                              </h3>
                              <p className="text-sm text-muted-foreground sm:text-base">
                                {recipe.storageInstructions}
                              </p>
                            </div>
                          </div>
                        )}

                        {recipe.reheatingInstructions && (
                          <div className="flex">
                            <div className="mr-3 flex-shrink-0 sm:mr-4">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10">
                                <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-1 text-base font-medium text-foreground sm:text-lg">
                                Reheating
                              </h3>
                              <p className="text-sm text-muted-foreground sm:text-base">
                                {recipe.reheatingInstructions}
                              </p>
                            </div>
                          </div>
                        )}

                        {recipe.makeAheadInstructions && (
                          <div className="flex">
                            <div className="mr-3 flex-shrink-0 sm:mr-4">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10">
                                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-1 text-base font-medium text-foreground sm:text-lg">
                                Make Ahead
                              </h3>
                              <p className="text-sm text-muted-foreground sm:text-base">
                                {recipe.makeAheadInstructions}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {recipe.notes && (
                  <div>
                    <h2 className="mb-3 text-xl font-semibold text-foreground sm:mb-4 sm:text-2xl">
                      Chef&apos;s Notes
                    </h2>
                    <Card>
                      <CardContent className="pt-4 sm:pt-6">
                        <div className="flex">
                          <div className="mr-3 flex-shrink-0 sm:mr-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10">
                              <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                          </div>
                          <p className="pt-1 text-sm text-muted-foreground sm:pt-2 sm:text-base">
                            {recipe.notes}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <div className="sticky top-4">
            {(recipe.calories || recipe.protein || recipe.carbs || recipe.fat) && (
              <Card className="mb-4 overflow-hidden shadow-sm sm:mb-6">
                <div className="bg-primary p-3 sm:p-4">
                  <h2 className="mb-0 text-lg font-semibold text-primary-foreground sm:mb-1 sm:text-xl">
                    Nutrition Facts
                  </h2>
                  <p className="mb-0 text-xs text-primary-foreground/90 sm:text-sm">
                    {recipe.servingSize ? `Per serving (${recipe.servingSize})` : 'Per serving'}
                  </p>
                </div>
                <CardContent className="pt-4 sm:pt-6">
                  {recipe.calories && (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground sm:text-base">
                          Calories
                        </span>
                        <span className="text-sm text-foreground sm:text-base">
                          {recipe.calories}
                        </span>
                      </div>
                      <Separator className="my-2 sm:my-3" />
                    </div>
                  )}

                  {recipe.protein && (
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground sm:text-base">
                          Protein
                        </span>
                        <span className="text-sm text-foreground sm:text-base">
                          {recipe.protein}g
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-muted sm:mt-2 sm:h-2">
                        <div
                          className="h-1.5 rounded-full bg-blue-500 sm:h-2"
                          style={{ width: `${(recipe.protein / 50) * 100}%` }}></div>
                      </div>
                    </div>
                  )}

                  {recipe.carbs && (
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground sm:text-base">
                          Carbs
                        </span>
                        <span className="text-sm text-foreground sm:text-base">
                          {recipe.carbs}g
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-muted sm:mt-2 sm:h-2">
                        <div
                          className="h-1.5 rounded-full bg-primary/70 sm:h-2"
                          style={{ width: `${(recipe.carbs / 300) * 100}%` }}></div>
                      </div>
                    </div>
                  )}

                  {recipe.fat && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground sm:text-base">
                          Fat
                        </span>
                        <span className="text-sm text-foreground sm:text-base">{recipe.fat}g</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-muted sm:mt-2 sm:h-2">
                        <div
                          className="h-1.5 rounded-full bg-rose-500 sm:h-2"
                          style={{ width: `${(recipe.fat / 65) * 100}%` }}></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
                  Recipe Details
                </h3>
                <dl className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Coffee className="mr-1.5 h-3.5 w-3.5 text-muted-foreground sm:mr-2 sm:h-4 sm:w-4" />
                      Cuisine:
                    </dt>
                    <dd className="font-medium text-foreground">{recipe.cuisineType}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Utensils className="mr-1.5 h-3.5 w-3.5 text-muted-foreground sm:mr-2 sm:h-4 sm:w-4" />
                      Meal Type:
                    </dt>
                    <dd className="font-medium text-foreground">{recipe.mealType}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Clock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground sm:mr-2 sm:h-4 sm:w-4" />
                      Prep Time:
                    </dt>
                    <dd className="font-medium text-foreground">{recipe.preparationTime} min</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Flame className="mr-1.5 h-3.5 w-3.5 text-muted-foreground sm:mr-2 sm:h-4 sm:w-4" />
                      Cook Time:
                    </dt>
                    <dd className="font-medium text-foreground">{recipe.cookingTime} min</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Timer className="mr-1.5 h-3.5 w-3.5 text-muted-foreground sm:mr-2 sm:h-4 sm:w-4" />
                      Total Time:
                    </dt>
                    <dd className="font-medium text-foreground">{totalTime} min</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Users className="mr-1.5 h-3.5 w-3.5 text-muted-foreground sm:mr-2 sm:h-4 sm:w-4" />
                      Servings:
                    </dt>
                    <dd className="font-medium text-foreground">{recipe.servings}</dd>
                  </div>

                  {recipe.yield && (
                    <div className="flex justify-between">
                      <dt className="flex items-center text-muted-foreground">
                        <Scale className="mr-1.5 h-3.5 w-3.5 text-muted-foreground sm:mr-2 sm:h-4 sm:w-4" />
                        Yield:
                      </dt>
                      <dd className="font-medium text-foreground">{recipe.yield}</dd>
                    </div>
                  )}

                  {recipe.costLevel && (
                    <div className="flex justify-between">
                      <dt className="flex items-center text-muted-foreground">
                        <DollarSign className="mr-1.5 h-3.5 w-3.5 text-muted-foreground sm:mr-2 sm:h-4 sm:w-4" />
                        Cost Level:
                      </dt>
                      <dd className="font-medium text-foreground">{recipe.costLevel}</dd>
                    </div>
                  )}

                  {recipe.seasonality && (
                    <div className="flex justify-between">
                      <dt className="flex items-center text-muted-foreground">
                        <CalendarClock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground sm:mr-2 sm:h-4 sm:w-4" />
                        Seasonality:
                      </dt>
                      <dd className="font-medium text-foreground">{recipe.seasonality}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center text-xl font-semibold text-foreground sm:text-2xl">
            <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
            Reviews & Comments
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({recipe.comments.length})
            </span>
          </h2>
          <div className="flex items-center">
            <StarRating rating={recipe.averageRating || 0} size="md" className="mr-2" />
            <span className="text-sm font-medium text-foreground">
              {(recipe.averageRating || 0).toFixed(1)}
            </span>
          </div>
        </div>

        {/* Add Comment Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <CommentForm onFormSubmit={addCommentHandler} />
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4 sm:space-y-6">
          {recipe.comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {comment.author.imageUrl && (
                    <Avatar className="h-10 w-10 border-2 border-muted sm:h-12 sm:w-12">
                      <AvatarImage
                        src={comment.author.imageUrl}
                        alt={`${comment.author.firstName} ${comment.author.lastName}`}
                      />
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {comment.author.firstName
                          ?.split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex-1">
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {comment.author.firstName} {comment.author.lastName}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <StarRating rating={comment.rating} size="sm" />
                    </div>

                    <p className="text-sm text-foreground sm:text-base">{comment.content}</p>
                  </div>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <CommentReply
                    imageUrl={comment.replies[0].author?.imageUrl}
                    firstName={comment.replies[0].author?.firstName}
                    lastName={comment.replies[0].author?.lastName}
                    content={comment.replies[0].content}
                    createdAt={comment.replies[0].createdAt}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
