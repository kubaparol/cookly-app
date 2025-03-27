'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import FormNavigation from '../base/FormNavigation';
import Stepper from '../base/Stepper';
import AdditionalDetailsStepForm, {
  AdditionalDetailsStepFormSchema,
} from '../forms/AdditionalDetailsStepForm';
import BasicInformationStepForm, {
  BasicInformationStepFormSchema,
} from '../forms/BasicInformationStepForm';
import IngredientsStepForm, { IngredientsStepFormSchema } from '../forms/IngredientsStepForm';
import PreparationStepsForm, { PreparationStepsFormSchema } from '../forms/PreparationStepsForm';
import ReviewSubmitStepForm, { ReviewSubmitStepFormSchema } from '../forms/ReviewSubmitStepForm';
import TimeServingsStepForm, { TimeServingsStepFormSchema } from '../forms/TimeServingsStepForm';

const steps = [
  {
    label: 'Basic Information',
    value: 'basic-information',
    Component: BasicInformationStepForm,
    schema: BasicInformationStepFormSchema,
  },
  {
    label: 'Time & Servings',
    value: 'time-servings',
    Component: TimeServingsStepForm,
    schema: TimeServingsStepFormSchema,
  },
  {
    label: 'Ingredients',
    value: 'ingredients',
    Component: IngredientsStepForm,
    schema: IngredientsStepFormSchema,
  },
  {
    label: 'Preparation Steps',
    value: 'preparation-steps',
    Component: PreparationStepsForm,
    schema: PreparationStepsFormSchema,
  },
  {
    label: 'Additional Details',
    value: 'additional-details',
    Component: AdditionalDetailsStepForm,
    schema: AdditionalDetailsStepFormSchema,
  },
  {
    label: 'Review & Submit',
    value: 'review-submit',
    Component: ReviewSubmitStepForm,
    schema: ReviewSubmitStepFormSchema,
  },
] as const;

type StepValue = (typeof steps)[number]['value'];

const getStepByValue = (value: StepValue) => {
  const step = steps.find((s) => s.value === value);

  if (!step) throw new Error(`Invalid step value: ${value}`);

  return step;
};

export const RecipeFormSchema = z.object({
  ...BasicInformationStepFormSchema.shape,
  ...TimeServingsStepFormSchema.shape,
  ...IngredientsStepFormSchema.shape,
  ...PreparationStepsFormSchema.shape,
  ...AdditionalDetailsStepFormSchema.shape,
  ...ReviewSubmitStepFormSchema.shape,
});

export type RecipeFormValues = z.infer<typeof RecipeFormSchema>;

export default function RecipeFormContainer() {
  const [currentStep, setCurrentStep] = useState<StepValue>('basic-information');

  const methods = useForm<RecipeFormValues>({
    resolver: zodResolver(RecipeFormSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
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

  const { Component, schema } = getStepByValue(currentStep);
  const currentIndex = steps.findIndex((s) => s.value === currentStep);

  const handleNextStep = useCallback(() => {
    const nextStep = steps[currentIndex + 1];

    if (nextStep) {
      setCurrentStep(nextStep.value);
    } else {
      const formData = methods.getValues();
      console.log('Final submission: ', formData);
      // Here you would typically submit the form data to your API
    }
  }, [currentIndex, methods]);

  const handleBackStep = useCallback(() => {
    const prevStep = steps[currentIndex - 1];
    if (prevStep) {
      setCurrentStep(prevStep.value);
    }
  }, [currentIndex]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-1 flex-col gap-3 xs:gap-6 lg:gap-12">
        <Stepper steps={steps} currentStep={currentStep} />

        <Component />

        <div className="mt-auto">
          <FormNavigation
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
            isFirstStep={currentIndex === 0}
            isLastStep={currentIndex === steps.length - 1}
            currentStepSchema={schema}
          />
        </div>
      </div>
    </FormProvider>
  );
}
