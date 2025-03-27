import { Progress } from '../ui/progress';

export interface StepItem {
  label: string;
  value: string;
}

export interface StepperProps {
  steps: readonly StepItem[];
  currentStep: string;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  const currentIndex = steps.findIndex((step) => step.value === currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="grid w-full gap-2">
      <span className="ml-auto text-center text-sm text-muted-foreground">
        {currentIndex + 1}/{steps.length}
      </span>

      <Progress value={progress} />
    </div>
  );
}
