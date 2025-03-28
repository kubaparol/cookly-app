'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ProjectUrls } from '@/constants';

import { createRecipe, updateRecipe } from '@/db';

import Stepper from '@/components/base/Stepper';
import StatusCard from '@/components/shared/StatusCard';

import { useRecipeFormSteps } from './hooks/use-recipe-form-steps';
import { RecipeFormValues, recipeFormSchema } from './schemas';
import FormNavigation from './ui/FormNavigation';

interface RecipeFormProps {
  type: 'Create' | 'Update';
  id?: string;
  defaultValues?: Partial<RecipeFormValues>;
  isSuccess?: boolean;
}

export default function RecipeForm(props: RecipeFormProps) {
  const { type, id, defaultValues, isSuccess = false } = props;

  const [isCreationSuccess, setIsCreationSuccess] = useState(isSuccess);

  const router = useRouter();
  const pathname = usePathname();

  const {
    currentStepIndex,
    stepsLength,
    currentStep,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
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
      preparationTime: '',
      cookingTime: '',
      servings: '',
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
    }
  }, [goToNextStep, id, isLastStep, methods, pathname, router, type]);

  const currentStepSchema = currentStep.schema;
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
      <div className="flex flex-1 flex-col gap-3 xs:gap-6 lg:gap-12">
        <Stepper
          currentStepLabel={currentStep.label}
          currentStepIndex={currentStepIndex}
          stepsLength={stepsLength}
        />

        <div className="flex-1 pb-8">
          <CurrentStepComponent />
        </div>

        <FormNavigation
          onNextStep={handleNextStep}
          onBackStep={handleBackStep}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          currentStepSchema={currentStepSchema}
        />
      </div>
    </FormProvider>
  );
}
