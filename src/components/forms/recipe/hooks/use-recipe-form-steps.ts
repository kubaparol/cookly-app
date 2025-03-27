import { useCallback, useState } from 'react';

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

export const useRecipeFormSteps = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    {
      label: 'Basic Information',
      schema: basicInformationStepFormSchema,
      Component: BasicInformationStepForm,
    },
    {
      label: 'Time & Servings',
      schema: timeServingsStepFormSchema,
      Component: TimeServingsStepForm,
    },
    {
      label: 'Ingredients',
      schema: ingredientsStepFormSchema,
      Component: IngredientsStepForm,
    },
    {
      label: 'Preparation Steps',
      schema: preparationStepsFormSchema,
      Component: PreparationStepsForm,
    },
    {
      label: 'Additional Details',
      schema: additionalDetailsStepFormSchema,
      Component: AdditionalDetailsStepForm,
    },
    {
      label: 'Review & Submit',
      schema: reviewSubmitStepFormSchema,
      Component: ReviewSubmitStepForm,
    },
  ] as const;

  const stepsLength = steps.length;
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

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

  return {
    currentStepIndex,
    stepsLength,
    currentStep,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
  };
};
