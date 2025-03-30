import {
  AlertCircle,
  BookOpen,
  CalendarClock,
  ChefHat,
  Clock,
  Coffee,
  DollarSign,
  Flame,
  Heart,
  Info,
  Leaf,
  Scale,
  Sparkles,
  Timer,
  Users,
  Utensils,
} from 'lucide-react';
import Image from 'next/image';

import { getTotalCookingTime } from '@/utils';

import { ProjectUrls } from '@/constants';

import { Recipe } from '@/db';

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
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RecipeView(recipe: Recipe) {
  const author = {
    firstName: 'John',
    lastName: 'Doe',
    imageUrl:
      'https://fastly.picsum.photos/id/95/200/200.jpg?hmac=EFN5lZlH5NAZUP3gI_uiihIaHacpG1u4aw_KmeJgeQ0',
  };

  const totalTime = getTotalCookingTime({
    preparationTime: recipe.preparationTime,
    cookingTime: recipe.cookingTime,
    restTime: recipe.restTime || 0,
  });

  return (
    <>
      {/* Breadcrumb */}
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

      <div className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:gap-8 lg:grid-cols-2">
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {recipe.categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs sm:text-sm">
                {category}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl font-bold leading-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
            {recipe.title}
          </h1>

          {recipe.description && (
            <p className="text-base text-muted-foreground sm:text-lg">{recipe.description}</p>
          )}

          <div className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
            <Avatar className="h-10 w-10 border-2 border-gray-100 sm:h-12 sm:w-12">
              <AvatarImage src={author.imageUrl} alt={`${author.firstName} ${author.lastName}`} />
              <AvatarFallback className="bg-gray-100 text-xs text-gray-800 sm:text-sm">
                {author.firstName[0]}
                {author.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-black sm:text-base">
                {author.firstName} {author.lastName}
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
            <div className="flex flex-col items-center rounded-xl border bg-white p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                <Clock className="h-4 w-4 text-gray-700 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-base font-semibold text-black sm:text-lg">{totalTime} min</span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">Total Time</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border bg-white p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                <ChefHat className="h-4 w-4 text-gray-700 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-base font-semibold text-black sm:text-lg">
                {recipe.difficulty}
              </span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">Difficulty</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border bg-white p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                <Users className="h-4 w-4 text-gray-700 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-base font-semibold text-black sm:text-lg">
                {recipe.servings}
              </span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">Servings</span>
            </div>

            {recipe.calories ? (
              <div className="flex flex-col items-center rounded-xl border bg-white p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                  <Flame className="h-4 w-4 text-gray-700 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </div>
                <span className="text-base font-semibold text-black sm:text-lg">
                  {recipe.calories}
                </span>
                <span className="text-[10px] text-muted-foreground sm:text-xs">Calories</span>
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-xl border bg-white p-2 text-center shadow-sm transition-all hover:shadow-md sm:p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12">
                  <Timer className="h-4 w-4 text-gray-700 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </div>
                <span className="text-base font-semibold text-black sm:text-lg">
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
                className="border-0 bg-green-50 text-xs text-green-800 hover:bg-green-100">
                <Leaf className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {tag}
              </Badge>
            ))}

            {recipe.allergens?.map((allergen) => (
              <Badge
                key={allergen}
                variant="outline"
                className="border-red-200 bg-red-50 text-xs text-red-700 hover:bg-red-100">
                <AlertCircle className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {allergen}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-4 border-white shadow-lg sm:rounded-2xl">
          <Image
            src={recipe.imageUrl || '/placeholder.svg'}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
            <button className="rounded-full bg-white/90 p-1.5 shadow-md transition-all hover:scale-105 hover:bg-white sm:p-2">
              <Heart className="h-4 w-4 text-rose-500 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Details */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-xl bg-gray-50 p-1">
              <TabsTrigger
                value="ingredients"
                className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm sm:text-sm">
                <Scale className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Ingredients</span>
                <span className="xs:hidden">Ingr.</span>
              </TabsTrigger>
              <TabsTrigger
                value="instructions"
                className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm sm:text-sm">
                <BookOpen className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Instructions</span>
                <span className="xs:hidden">Instr.</span>
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm sm:text-sm">
                <Info className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Notes & Tips</span>
                <span className="xs:hidden">Notes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="pt-4 sm:pt-6 md:pt-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                <div>
                  <h2 className="mb-3 flex items-center text-xl font-semibold text-black sm:mb-4 sm:text-2xl">
                    <Scale className="mr-2 h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                    Ingredients
                  </h2>
                  <p className="mb-4 text-xs text-muted-foreground sm:mb-6 sm:text-sm">
                    {recipe.servings} servings
                    {recipe.servingSize ? ` (${recipe.servingSize} per serving)` : ''}
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.id} className="flex items-start">
                        <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 sm:mr-3 sm:h-6 sm:w-6">
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-300 sm:h-3 sm:w-3"></div>
                        </div>
                        <span className="text-sm text-black sm:text-base">
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
                  <h2 className="mb-3 flex items-center text-xl font-semibold text-black sm:mb-4 sm:text-2xl">
                    <Utensils className="mr-2 h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                    Equipment
                  </h2>
                  <ul className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
                    {recipe.equipment.map((item) => (
                      <li key={item.id} className="flex items-start">
                        <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 sm:mr-3 sm:h-6 sm:w-6">
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-300 sm:h-3 sm:w-3"></div>
                        </div>
                        <span className="text-sm text-black sm:text-base">{item.name}</span>
                      </li>
                    ))}
                  </ul>

                  {recipe.substitutions.length > 0 && (
                    <>
                      <h3 className="mb-3 mt-6 text-lg font-semibold text-black sm:mb-4 sm:mt-8 sm:text-xl">
                        Substitutions
                      </h3>
                      <Card className="border-gray-200 bg-white">
                        <CardContent className="pt-4 sm:pt-6">
                          <ul className="space-y-3 sm:space-y-4">
                            {recipe.substitutions.map((sub) => (
                              <li key={sub.id} className="flex items-start">
                                <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mr-3 sm:h-6 sm:w-6">
                                  <Sparkles className="h-3 w-3 text-gray-600 sm:h-3.5 sm:w-3.5" />
                                </div>
                                <span className="text-sm text-black sm:text-base">
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
              <h2 className="mb-4 flex items-center text-xl font-semibold text-black sm:mb-6 sm:text-2xl">
                <BookOpen className="mr-2 h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                Instructions
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {recipe.steps.map((step) => (
                  <div key={step.id} className="group flex">
                    <div className="mr-3 flex-shrink-0 sm:mr-5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 font-semibold text-black transition-colors group-hover:bg-gray-200 sm:h-10 sm:w-10">
                        {step.order}
                      </div>
                    </div>

                    <div className="pt-1">
                      <p className="text-base text-black sm:text-lg">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="pt-4 sm:pt-6 md:pt-8">
              <div className="space-y-6 sm:space-y-8 md:space-y-10">
                {recipe.tips.length > 0 && (
                  <div>
                    <h2 className="mb-3 text-xl font-semibold text-black sm:mb-4 sm:text-2xl">
                      Chef&apos;s Tips
                    </h2>
                    <Card className="border-gray-200 bg-white">
                      <CardContent className="pt-4 sm:pt-6">
                        <ul className="space-y-3 sm:space-y-4">
                          {recipe.tips.map((tip) => (
                            <li key={tip.id} className="flex items-start">
                              <div className="mr-2 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mr-3 sm:h-6 sm:w-6">
                                <Sparkles className="h-3 w-3 text-gray-600 sm:h-3.5 sm:w-3.5" />
                              </div>
                              <span className="text-sm text-black sm:text-base">
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
                    <h2 className="mb-3 text-xl font-semibold text-black sm:mb-4 sm:text-2xl">
                      Storage & Preparation
                    </h2>
                    <Card className="border-gray-200 bg-white">
                      <CardContent className="space-y-4 pt-4 sm:space-y-6 sm:pt-6">
                        {recipe.storageInstructions && (
                          <div className="flex">
                            <div className="mr-3 flex-shrink-0 sm:mr-4">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 sm:h-10 sm:w-10">
                                <CalendarClock className="h-4 w-4 sm:h-5 sm:w-5" />
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-1 text-base font-medium text-black sm:text-lg">
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
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 sm:h-10 sm:w-10">
                                <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-1 text-base font-medium text-black sm:text-lg">
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
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 sm:h-10 sm:w-10">
                                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-1 text-base font-medium text-black sm:text-lg">
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
                    <h2 className="mb-3 text-xl font-semibold text-black sm:mb-4 sm:text-2xl">
                      Chef&apos;s Notes
                    </h2>
                    <Card className="border-gray-200 bg-white">
                      <CardContent className="pt-4 sm:pt-6">
                        <div className="flex">
                          <div className="mr-3 flex-shrink-0 sm:mr-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 sm:h-10 sm:w-10">
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
              <Card className="mb-4 overflow-hidden border-gray-200 bg-white shadow-sm sm:mb-6">
                <div className="bg-gray-900 p-3 sm:p-4">
                  <h2 className="mb-0 text-lg font-semibold text-white sm:mb-1 sm:text-xl">
                    Nutrition Facts
                  </h2>
                  <p className="mb-0 text-xs text-white/90 sm:text-sm">
                    {recipe.servingSize ? `Per serving (${recipe.servingSize})` : 'Per serving'}
                  </p>
                </div>
                <CardContent className="pt-4 sm:pt-6">
                  {recipe.calories && (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-black sm:text-base">
                          Calories
                        </span>
                        <span className="text-sm text-black sm:text-base">
                          {recipe.calories} kcal
                        </span>
                      </div>
                      <Separator className="my-2 sm:my-3" />
                    </div>
                  )}

                  {recipe.protein && (
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-black sm:text-base">Protein</span>
                        <span className="text-sm text-black sm:text-base">{recipe.protein}g</span>
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
                        <span className="text-sm font-medium text-black sm:text-base">Carbs</span>
                        <span className="text-sm text-black sm:text-base">{recipe.carbs}g</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-muted sm:mt-2 sm:h-2">
                        <div
                          className="h-1.5 rounded-full bg-gray-500 sm:h-2"
                          style={{ width: `${(recipe.carbs / 300) * 100}%` }}></div>
                      </div>
                    </div>
                  )}

                  {recipe.fat && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-black sm:text-base">Fat</span>
                        <span className="text-sm text-black sm:text-base">{recipe.fat}g</span>
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

            <Card className="border-gray-200 bg-white shadow-sm">
              <CardContent className="pt-4 sm:pt-6">
                <h3 className="mb-3 text-base font-semibold text-black sm:mb-4 sm:text-lg">
                  Recipe Details
                </h3>
                <dl className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Coffee className="mr-1.5 h-3.5 w-3.5 text-gray-600 sm:mr-2 sm:h-4 sm:w-4" />
                      Cuisine:
                    </dt>
                    <dd className="font-medium text-black">{recipe.cuisineType}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Utensils className="mr-1.5 h-3.5 w-3.5 text-gray-600 sm:mr-2 sm:h-4 sm:w-4" />
                      Meal Type:
                    </dt>
                    <dd className="font-medium text-black">{recipe.mealType}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Clock className="mr-1.5 h-3.5 w-3.5 text-gray-600 sm:mr-2 sm:h-4 sm:w-4" />
                      Prep Time:
                    </dt>
                    <dd className="font-medium text-black">{recipe.preparationTime} min</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Flame className="mr-1.5 h-3.5 w-3.5 text-gray-600 sm:mr-2 sm:h-4 sm:w-4" />
                      Cook Time:
                    </dt>
                    <dd className="font-medium text-black">{recipe.cookingTime} min</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Timer className="mr-1.5 h-3.5 w-3.5 text-gray-600 sm:mr-2 sm:h-4 sm:w-4" />
                      Total Time:
                    </dt>
                    <dd className="font-medium text-black">{totalTime} min</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="flex items-center text-muted-foreground">
                      <Users className="mr-1.5 h-3.5 w-3.5 text-gray-600 sm:mr-2 sm:h-4 sm:w-4" />
                      Servings:
                    </dt>
                    <dd className="font-medium text-black">{recipe.servings}</dd>
                  </div>

                  {recipe.yield && (
                    <div className="flex justify-between">
                      <dt className="flex items-center text-muted-foreground">
                        <Scale className="mr-1.5 h-3.5 w-3.5 text-gray-600 sm:mr-2 sm:h-4 sm:w-4" />
                        Yield:
                      </dt>
                      <dd className="font-medium text-black">{recipe.yield}</dd>
                    </div>
                  )}

                  {recipe.costLevel && (
                    <div className="flex justify-between">
                      <dt className="flex items-center text-muted-foreground">
                        <DollarSign className="mr-1.5 h-3.5 w-3.5 text-gray-600 sm:mr-2 sm:h-4 sm:w-4" />
                        Cost Level:
                      </dt>
                      <dd className="font-medium text-black">{recipe.costLevel}</dd>
                    </div>
                  )}

                  {recipe.seasonality && (
                    <div className="flex justify-between">
                      <dt className="flex items-center text-muted-foreground">
                        <CalendarClock className="mr-1.5 h-3.5 w-3.5 text-gray-600 sm:mr-2 sm:h-4 sm:w-4" />
                        Seasonality:
                      </dt>
                      <dd className="font-medium text-black">{recipe.seasonality}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
