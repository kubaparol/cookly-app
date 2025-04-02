'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import RecipeFormLayout from '@/components/layouts/RecipeFormLayout';

import ReviewSubmitStepForm from './ReviewSubmitStepForm';
import { useRecipeFormSteps } from './hooks/use-recipe-form-steps';
import { RecipeFormValues, recipeFormSchema } from './schemas';

interface RecipeFormProps {
  type: 'Create' | 'Update';
  id?: string;
  defaultValues?: Partial<RecipeFormValues>;
}

export default function RecipeForm(props: RecipeFormProps) {
  const { type, id, defaultValues } = props;

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
    }
  }, [goToNextStep, isLastStep]);

  const CurrentStepComponent = currentStep.Component;

  const isReviewStepForm = currentStep.name === 'Review & Submit';

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
        {isReviewStepForm ? (
          <ReviewSubmitStepForm formType={type} recipeId={id} />
        ) : (
          <CurrentStepComponent />
        )}
      </RecipeFormLayout>
    </FormProvider>
  );
}
