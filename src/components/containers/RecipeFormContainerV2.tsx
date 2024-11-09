'use client';

import { useCallback, useState } from 'react';

import Stepper from '../base/Stepper';
import AdditionalDetailsStepForm from '../forms/AdditionalDetailsStepForm';
import BasicInformationStepForm from '../forms/BasicInformationStepForm';
import IngredientsStepForm from '../forms/IngredientsStepForm';
import PreparationStepsForm from '../forms/PreparationStepsForm';
import ReviewSubmitStepForm from '../forms/ReviewSubmitStepForm';
import TimeServingsStepForm from '../forms/TimeServingsStepForm';

const steps = [
  {
    label: 'Basic Information',
    value: 'basic-information',
    Component: BasicInformationStepForm,
  },
  {
    label: 'Time & Servings',
    value: 'time-servings',
    Component: TimeServingsStepForm,
  },
  {
    label: 'Ingredients',
    value: 'ingredients',
    Component: IngredientsStepForm,
  },
  {
    label: 'Preparation Steps',
    value: 'preparation-steps',
    Component: PreparationStepsForm,
  },
  {
    label: 'Additional Details',
    value: 'additional-details',
    Component: AdditionalDetailsStepForm,
  },
  {
    label: 'Review & Submit',
    value: 'review-submit',
    Component: ReviewSubmitStepForm,
  },
] as const;

type StepValue = (typeof steps)[number]['value'];

const getStepByValue = (value: StepValue) => {
  const step = steps.find((s) => s.value === value);

  if (!step) throw new Error(`Invalid step value: ${value}`);

  return step;
};

export default function RecipeFormContainer() {
  const [currentStep, setCurrentStep] = useState<StepValue>('basic-information');

  const { Component } = getStepByValue(currentStep);

  const handleFormSubmit = useCallback(() => {
    const currentIndex = steps.findIndex((s) => s.value === currentStep);
    const nextStep = steps[currentIndex + 1];

    if (nextStep) {
      setCurrentStep(nextStep.value);
    } else {
      console.log('Final step submitted');
    }
  }, [currentStep]); // Only re-create if currentStep changes

  return (
    <div className="grid flex-1 grid-cols-[auto,_1fr] gap-3 xs:gap-6 lg:gap-12">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onSetStep={(step) => setCurrentStep(step as StepValue)}
      />

      <Component onFormSubmit={handleFormSubmit} />
    </div>
  );
}
