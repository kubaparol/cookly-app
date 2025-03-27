'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import FormNavigation from '../base/FormNavigation';
import Stepper from '../base/Stepper';
import { useRecipeFormSchema } from '../forms/recipe/hooks/use-recipe-form-schema';
import { useRecipeFormSteps } from '../forms/recipe/hooks/use-recipe-form-steps';

export default function RecipeFormContainer() {
  const {
    currentStepIndex,
    stepsLength,
    currentStep,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
  } = useRecipeFormSteps();

  const { recipeFormSchema } = useRecipeFormSchema();

  const methods = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      cuisineType: '',
      mealType: '',
      categories: [],
      preparationTime: '',
      cookingTime: '',
      servings: '',
      ingredients: [{ quantity: '', unit: '', name: '' }],
      steps: [{ description: '' }],
      difficulty: '',
      dietaryTags: [],
      notes: '',
      termsAccepted: false,
    },
    mode: 'onChange',
  });

  const handleBackStep = useCallback(() => {
    if (!isFirstStep) {
      goToPreviousStep();
    }
  }, [goToPreviousStep, isFirstStep]);

  const handleNextStep = useCallback(() => {
    if (!isLastStep) {
      goToNextStep();
    } else {
      const formData = methods.getValues();
      console.log('Final submission: ', formData);
    }
  }, [goToNextStep, isLastStep, methods]);

  const currentStepSchema = currentStep.schema;
  const CurrentStepComponent = currentStep.Component;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-1 flex-col gap-3 xs:gap-6 lg:gap-12">
        <Stepper
          currentStepLabel={currentStep.label}
          currentStepIndex={currentStepIndex}
          stepsLength={stepsLength}
        />

        <CurrentStepComponent />

        <div className="mt-auto">
          <FormNavigation
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            currentStepSchema={currentStepSchema}
          />
        </div>
      </div>
    </FormProvider>
  );
}
