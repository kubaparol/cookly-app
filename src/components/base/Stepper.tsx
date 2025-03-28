import { Progress } from '../ui/progress';

export interface StepperProps {
  currentStepLabel: string;
  currentStepIndex: number;
  stepsLength: number;
}

export default function Stepper({ currentStepLabel, currentStepIndex, stepsLength }: StepperProps) {
  const progress = ((currentStepIndex + 1) / stepsLength) * 100;
  return (
    <div className="grid gap-1">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">
          Step {currentStepIndex + 1} of {stepsLength}
        </span>

        <span className="text-sm font-medium">{currentStepLabel}</span>
      </div>

      <Progress value={progress} />
    </div>
  );
}
