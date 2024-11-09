import { cn } from '@/utils';

import { Button } from '../ui/button';

export interface StepItem {
  label: string;
  value: string;
}

export interface StepperProps {
  steps: readonly StepItem[];
  currentStep: string;
  onSetStep: (step: string) => void;
}

export default function Stepper(props: StepperProps) {
  const { steps, currentStep, onSetStep } = props;

  return (
    <ul className="flex h-full flex-col gap-4">
      {steps.map((step, index) => (
        <li
          key={step.value}
          className={cn(
            'relative transition-all duration-300 ease-in-out',
            index < steps.length - 1 &&
              'after:absolute after:bottom-auto after:left-2 after:h-[calc(100%_-_18px)] after:w-1 after:rounded-full after:bg-primary-100',
            step.value === currentStep && 'flex-1',
          )}>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'relative size-5 rounded-full border-2 border-primary',
                'after:absolute after:left-1/2 after:top-1/2 after:hidden after:size-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-primary after:transition-all',
                steps.findIndex((step) => step.value === currentStep) > index &&
                  'after:block after:size-5',
                step.value === currentStep && 'after:block',
              )}
            />

            <Button
              type="button"
              variant={step.value === currentStep ? 'default' : 'ghost'}
              onClick={() => onSetStep(step.value)}>
              <p>
                <span className="font-bold lg:hidden">{index + 1}</span>
                <span className="max-lg:hidden">{step.label}</span>
              </p>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
