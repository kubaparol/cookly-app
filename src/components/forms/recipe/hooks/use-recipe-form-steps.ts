import { useCallback, useState } from 'react';

import AdditionalDetailsStepForm, {
  AdditionalDetailsStepFormSchema,
} from '../../AdditionalDetailsStepForm';
import BasicInformationStepForm, {
  BasicInformationStepFormSchema,
} from '../../BasicInformationStepForm';
import IngredientsStepForm, { IngredientsStepFormSchema } from '../../IngredientsStepForm';
import PreparationStepsForm, { PreparationStepsFormSchema } from '../../PreparationStepsForm';
import ReviewSubmitStepForm, { ReviewSubmitStepFormSchema } from '../../ReviewSubmitStepForm';
import TimeServingsStepForm, { TimeServingsStepFormSchema } from '../../TimeServingsStepForm';

export const useRecipeFormSteps = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    {
      label: 'Basic Information',
      schema: BasicInformationStepFormSchema,
      Component: BasicInformationStepForm,
    },
    {
      label: 'Time & Servings',
      schema: TimeServingsStepFormSchema,
      Component: TimeServingsStepForm,
    },
    {
      label: 'Ingredients',
      schema: IngredientsStepFormSchema,
      Component: IngredientsStepForm,
    },
    {
      label: 'Preparation Steps',
      schema: PreparationStepsFormSchema,
      Component: PreparationStepsForm,
    },
    {
      label: 'Additional Details',
      schema: AdditionalDetailsStepFormSchema,
      Component: AdditionalDetailsStepForm,
    },
    {
      label: 'Review & Submit',
      schema: ReviewSubmitStepFormSchema,
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
