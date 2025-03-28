import { Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../../../ui/button';

interface FormNavigationProps {
  onNextStep: () => void;
  onBackStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStepSchema: z.ZodObject<any>;
  isSubmitting?: boolean;
}

export default function FormNavigation({
  onNextStep,
  onBackStep,
  isFirstStep,
  isLastStep,
  currentStepSchema,
  isSubmitting = false,
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
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBackStep}
          disabled={isSubmitting}>
          Back
        </Button>
      )}

      <Button
        type="button"
        size="lg"
        onClick={handleNext}
        className="ml-auto"
        disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isLastStep ? 'Submitting...' : 'Loading...'}
          </>
        ) : isLastStep ? (
          'Submit Recipe'
        ) : (
          'Next'
        )}
      </Button>
    </div>
  );
}
