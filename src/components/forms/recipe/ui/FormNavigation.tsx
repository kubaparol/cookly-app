import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../../../ui/button';

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
    <div className="flex items-center justify-between gap-4 p-4">
      {!isFirstStep && (
        <Button type="button" variant="outline" size="default" onClick={onBackStep}>
          Back
        </Button>
      )}

      <Button type="button" size="default" onClick={handleNext} className="ml-auto">
        {isLastStep ? 'Submit Recipe' : 'Next'}
      </Button>
    </div>
  );
}
