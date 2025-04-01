import { ArrowLeft, ArrowRight, Check, ChevronRight, Save } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { cn } from '@/utils';

import { ProjectUrls } from '@/constants';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { RecipeFormStep } from '../forms/recipe/hooks/use-recipe-form-steps';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface RecipeFormLayoutProps {
  readonly children: ReactNode;
  currentStepIndex: number;
  currentStep: RecipeFormStep;
  steps: RecipeFormStep[];
  prevStep: RecipeFormStep;
  nextStep: RecipeFormStep;
  onBackStep: () => void;
  onNextStep: () => void;
  onGoToStep: (stepIndex: number) => void;
}

export default function RecipeFormLayout(props: RecipeFormLayoutProps) {
  const {
    children,
    currentStepIndex,
    currentStep,
    steps,
    prevStep,
    nextStep,
    onBackStep,
    onNextStep,
    onGoToStep,
  } = props;

  const progress = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="flex flex-col">
      <header className="border-b bg-background pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Create New Recipe</h1>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <span>
                Step {currentStepIndex + 1} of {steps.length}:
              </span>
              <span className="ml-1 font-medium text-foreground">{currentStep.name}</span>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <div className="flex-1 sm:w-40">
              <div className="mb-1 flex justify-between text-xs">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Button variant="outline" size="sm" disabled>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-6 py-6 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <nav className="space-y-2">
            {steps.map((step, index) => {
              const isActive = step.name === currentStep.name;
              const isCompleted = index < currentStepIndex;

              return (
                <div className="grid gap-2" key={index}>
                  <Button
                    variant={isActive ? 'default' : isCompleted ? 'secondary' : 'outline'}
                    onClick={() => onGoToStep(index)}>
                    <div className="mr-auto flex items-center gap-2">
                      <div
                        className={cn(
                          'flex size-6 items-center justify-center rounded-full',
                          isActive && 'bg-primary-foreground text-primary',
                          isCompleted && 'bg-primary/25 text-primary',
                        )}>
                        {isCompleted ? (
                          <Check className="!size-4" />
                        ) : (
                          <step.icon className="!size-4" />
                        )}
                      </div>

                      <span>{step.name}</span>
                    </div>

                    {!isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Button>
                </div>
              );
            })}
          </nav>

          <div className="mt-8 rounded-lg border bg-muted/50 p-4">
            <h3 className="mb-2 font-medium">Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Complete each step to create a comprehensive recipe</li>
              <li>• You can save as draft and continue later</li>
              <li>• Required fields are marked with an asterisk (*)</li>
              <li>• Preview your recipe before submitting</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{currentStep.name}</h2>
              <p className="text-muted-foreground">{currentStep.description}</p>
            </div>

            {children}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {prevStep ? (
              <Button variant="outline" onClick={onBackStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: {prevStep.name}
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your recipe progress will be saved as a draft, but you&apos;ll exit the recipe
                      creation flow.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Link href={ProjectUrls.myRecipes}>Exit to Dashboard</Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {nextStep ? (
              <Button onClick={onNextStep}>
                Next: {nextStep.name}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="text-muted-foreground">
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your recipe progress will be saved as a draft, but you&apos;ll exit the recipe
                      creation flow.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Link href={ProjectUrls.myRecipes}>Exit to Dashboard</Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
