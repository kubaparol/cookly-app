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
    <div className="sticky bottom-0 z-50 flex items-center justify-between gap-4 rounded-lg border border-x border-border bg-gradient-to-b from-background/80 to-background p-4 shadow-lg backdrop-blur-sm">
      {!isFirstStep && (
        <Button type="button" variant="outline" size="lg" onClick={onBackStep}>
          Back
        </Button>
      )}

      <Button type="button" size="lg" onClick={handleNext} className="ml-auto">
        {isLastStep ? 'Submit Recipe' : 'Next'}
      </Button>
    </div>
  );
}
