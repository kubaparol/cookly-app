import { Check, FileText, Info, ListChecks, LucideIcon, Timer, Utensils } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ZodSchema } from 'zod';

import AdditionalDetailsStepForm from '../AdditionalDetailsStepForm';
import BasicInformationStepForm from '../BasicInformationStepForm';
import IngredientsStepForm from '../IngredientsStepForm';
import PreparationStepsForm from '../PreparationStepsForm';
import ReviewSubmitStepForm from '../ReviewSubmitStepForm';
import TimeServingsStepForm from '../TimeServingsStepForm';
import {
  additionalDetailsStepFormSchema,
  basicInformationStepFormSchema,
  ingredientsStepFormSchema,
  preparationStepsFormSchema,
  reviewSubmitStepFormSchema,
  timeServingsStepFormSchema,
} from '../schemas';

export interface RecipeFormStep {
  name: string;
  description: string;
  icon: LucideIcon;
  schema: ZodSchema;
  Component: () => JSX.Element;
}

export const useRecipeFormSteps = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps: RecipeFormStep[] = [
    {
      name: 'Basic Information',
      description: 'Add the basic information to your recipe',
      icon: FileText,
      schema: basicInformationStepFormSchema,
      Component: BasicInformationStepForm,
    },
    {
      name: 'Time & Servings',
      description: 'Add the time and servings to your recipe',
      icon: Timer,
      schema: timeServingsStepFormSchema,
      Component: TimeServingsStepForm,
    },
    {
      name: 'Ingredients',
      description: 'Add the ingredients to your recipe',
      icon: Utensils,
      schema: ingredientsStepFormSchema,
      Component: IngredientsStepForm,
    },
    {
      name: 'Preparation Steps',
      description: 'Add the steps to prepare your recipe',
      icon: ListChecks,
      schema: preparationStepsFormSchema,
      Component: PreparationStepsForm,
    },
    {
      name: 'Additional Details',
      description: 'Add additional details to your recipe',
      icon: Info,
      schema: additionalDetailsStepFormSchema,
      Component: AdditionalDetailsStepForm,
    },
    {
      name: 'Review & Submit',
      description: 'Review your recipe details before publishing',
      icon: Check,
      schema: reviewSubmitStepFormSchema,
      Component: ReviewSubmitStepForm,
    },
  ] as const;

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const nextStep = steps[currentStepIndex + 1];
  const prevStep = steps[currentStepIndex - 1];

  const goToNextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  }, [currentStepIndex, steps.length]);

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  }, [currentStepIndex]);

  const goToStep = useCallback((stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
  }, []);

  return {
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
  };
};
