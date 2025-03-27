import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';

interface FormNavigationProps {
  onNextStep: () => void;
  onBackStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStepSchema: z.ZodObject<any>;
}

export default function FormNavigation({
  onNextStep,
  onBackStep,
  isFirstStep,
  isLastStep,
  currentStepSchema,
}: FormNavigationProps) {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger(Object.keys(currentStepSchema.shape));

    if (isValid) {
      onNextStep();
    }
  };

  return (
    <div className="flex gap-4">
      {!isFirstStep && (
        <Button type="button" variant="outline" size="sm" onClick={onBackStep}>
          Back
        </Button>
      )}
      <Button type="button" size="sm" onClick={handleNext}>
        {isLastStep ? 'Submit Recipe' : 'Next'}
      </Button>
    </div>
  );
}
