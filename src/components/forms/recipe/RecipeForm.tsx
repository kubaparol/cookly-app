'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ProjectUrls } from '@/constants';

import { createRecipe, updateRecipe } from '@/db';

import RecipeFormLayout from '@/components/layouts/RecipeFormLayout';
import StatusCard from '@/components/shared/StatusCard';

import { useRecipeFormSteps } from './hooks/use-recipe-form-steps';
import { RecipeFormValues, recipeFormSchema } from './schemas';

interface RecipeFormProps {
  type: 'Create' | 'Update';
  id?: string;
  defaultValues?: Partial<RecipeFormValues>;
  isSuccess?: boolean;
}

export default function RecipeForm(props: RecipeFormProps) {
  const { type, id, defaultValues, isSuccess = false } = props;

  const [isCreationSuccess, setIsCreationSuccess] = useState(isSuccess);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const {
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    steps,
    goToNextStep,
    goToPreviousStep,
    goToStep,
  } = useRecipeFormSteps();

  const methods = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      imageUrl: '',
      cuisineType: '',
      mealType: '',
      categories: [],
      preparationTime: 0,
      cookingTime: 0,
      servings: 0,
      ingredients: [{ name: '', quantity: '', unit: '' }],
      steps: [{ description: '' }],
      difficulty: '',
      dietaryTags: [],
      notes: '',
      equipment: [],
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      substitutions: [],
      tipsAndTricks: [],
      allergens: [],
      seasonality: '',
      termsAccepted: false,
    },
    mode: 'onChange',
  });

  const handleBackStep = useCallback(() => {
    if (!isFirstStep) {
      goToPreviousStep();
    }
  }, [goToPreviousStep, isFirstStep]);

  const handleNextStep = useCallback(async () => {
    if (!isLastStep) {
      goToNextStep();
    } else {
      const formData = methods.getValues();
      // setIsSubmitting(true);

      try {
        if (type === 'Create') {
          const result = await createRecipe(formData);

          if (result.success) {
            const params = new URLSearchParams();
            params.set('success', 'true');

            router.replace(`${pathname}?${params.toString()}`);
            methods.reset();
          } else {
            toast.error(result.message);
          }
        }

        if (type === 'Update') {
          const result = await updateRecipe({
            id: id!,
            ...formData,
          });

          if (result.success) {
            router.push(ProjectUrls.myRecipes);
            toast.success('Recipe updated successfully');
            methods.reset();
          } else {
            toast.error(result.message);
          }
        }
      } finally {
        // setIsSubmitting(false);
      }
    }
  }, [goToNextStep, id, isLastStep, methods, pathname, router, type]);

  const CurrentStepComponent = currentStep.Component;

  if (isCreationSuccess) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <StatusCard
          type="success"
          title="Success!"
          message="Your recipe has been created successfully"
          primaryAction={{
            label: 'Create Another Recipe',
            onClick: () => {
              setIsCreationSuccess(false);
              router.replace(`${pathname}`);
            },
          }}
          secondaryAction={{ label: 'See My Recipes', href: ProjectUrls.myRecipes }}
        />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <RecipeFormLayout
        currentStepIndex={currentStepIndex}
        currentStep={currentStep}
        steps={steps}
        prevStep={prevStep}
        nextStep={nextStep}
        onBackStep={handleBackStep}
        onNextStep={handleNextStep}
        onGoToStep={goToStep}
        formMethods={methods}>
        <CurrentStepComponent />
      </RecipeFormLayout>
    </FormProvider>
  );
}
