'use client';

import { useState } from 'react';

import Stepper from '../base/Stepper';

const steps = [
  {
    label: 'Basic Information',
    value: 'basic-information',
  },
  {
    label: 'Time & Servings',
    value: 'time-servings',
  },
  {
    label: 'Ingredients',
    value: 'ingredients',
  },
  {
    label: 'Preparation Steps',
    value: 'preparation-steps',
  },
  {
    label: 'Additional Details',
    value: 'additional-details',
  },
  {
    label: 'Review & Submit',
    value: 'review-submit',
  },
] as const;

type StepValue = (typeof steps)[number]['value'];

const elements: Record<StepValue, JSX.Element> = {
  'basic-information': <div>Basic Information</div>,
  'time-servings': <div>Time & Servings</div>,
  ingredients: <div>Ingredients</div>,
  'preparation-steps': <div>Preparation Steps</div>,
  'additional-details': <div>Additional Details</div>,
  'review-submit': <div>Review & Submit</div>,
};

export default function RecipeFormContainerV2() {
  const [currentStep, setCurrentStep] = useState<StepValue>('basic-information');

  return (
    <div className="grid flex-1 grid-cols-[auto,_1fr] gap-3 xs:gap-6 lg:gap-12">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onSetStep={(step) => setCurrentStep(step as StepValue)}
      />

      <div className="border-2 border-green-400">{elements[currentStep]}</div>
    </div>
  );
}
