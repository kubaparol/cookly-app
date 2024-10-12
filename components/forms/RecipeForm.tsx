"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Pencil, Plus, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import IngredientForm, {
  ingredientFormSchema,
  IngredientFormValues,
} from "./IngredientForm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import StepForm, { StepFormSchema, StepFormValues } from "./StepForm";

const recipeFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be at most 255 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters")
    .optional(),
  ingredients: z
    .array(ingredientFormSchema)
    .min(1, "At least one ingredient is required"),
  steps: z.array(StepFormSchema).min(1, "At least one step is required"),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;

interface RecipeFormProps {
  type: "Create" | "Update";
}

export default function RecipeForm(props: RecipeFormProps) {
  const { type } = props;

  const [isAddIngredientModalOpen, setIsAddIngredientModalOpen] =
    useState(false);
  const [ingredientToEdit, setIngredientToEdit] =
    useState<IngredientFormValues | null>(null);
  const [ingredientIdToDelete, setIngredientIdToDelete] = useState<
    string | null
  >(null);

  const [isAddStepModalOpen, setIsAddStepModalOpen] = useState(false);
  const [stepToEdit, setStepToEdit] = useState<StepFormValues | null>(null);
  const [stepIdToDelete, setStepIdToDelete] = useState<string | null>(null);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: [],
      steps: [],
    },
  });

  const onSubmit = (values: RecipeFormValues) => {
    console.log(values);
  };

  const ingredientFormSubmitHandler = (values: IngredientFormValues) => {
    // add new
    if (isAddIngredientModalOpen) {
      form.setValue("ingredients", [...form.getValues().ingredients, values]);
      form.trigger("ingredients");
      setIsAddIngredientModalOpen(false);

      return;
    }

    // edit
    const ingredients = form.getValues().ingredients;
    const ingredientToUpdateIndex = ingredients.findIndex(
      (i) => i.id === values.id
    );

    if (ingredientToUpdateIndex !== -1) {
      const updatedIngredients = [...ingredients];
      updatedIngredients[ingredientToUpdateIndex] = values;
      form.setValue("ingredients", updatedIngredients);
      setIngredientToEdit(null);

      return;
    }
  };

  const stepFormSubmitHandler = (values: StepFormValues) => {
    // add new
    if (isAddStepModalOpen) {
      form.setValue("steps", [...form.getValues().steps, values]);
      form.trigger("steps");
      setIsAddStepModalOpen(false);

      return;
    }

    // edit
    const steps = form.getValues().steps;
    const stepToUpdateIndex = steps.findIndex((i) => i.id === values.id);

    if (stepToUpdateIndex !== -1) {
      const updatedSteps = [...steps];
      updatedSteps[stepToUpdateIndex] = values;
      form.setValue("steps", updatedSteps);
      setStepToEdit(null);

      return;
    }
  };

  const deleteIngredient = (id: string) => {
    const ingredients = form.getValues().ingredients;
    const updatedIngredients = ingredients.filter((i) => i.id !== id);
    form.setValue("ingredients", updatedIngredients);

    if (form.formState.isSubmitted) {
      form.trigger("ingredients");
    }
  };

  const deleteStep = (id: string) => {
    const steps = form.getValues().steps;
    const updatedSteps = steps.filter((i) => i.id !== id);
    form.setValue("steps", updatedSteps);

    if (form.formState.isSubmitted) {
      form.trigger("steps");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500 text-[18px]">*</span>
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Classic Spaghetti Bolognese"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>

                <FormControl className="h-32">
                  <Textarea
                    placeholder="e.g., A rich and hearty Italian pasta dish with a savory meat sauce..."
                    {...field}
                    className="rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem className="w-fulls">
                <FormLabel>
                  <span className="text-red-500 text-[18px]">*</span>
                  Ingredients
                </FormLabel>

                <div className="border p-4 rounded-lg grid gap-5">
                  {field.value.length === 0 && (
                    <p className="text-muted-foreground text-sm italic">
                      No ingredients added
                    </p>
                  )}

                  {field.value.length > 0 && (
                    <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {field.value.map((field, index) => (
                        <li key={index}>
                          <Badge
                            variant="secondary"
                            className="flex gap-3 justify-between"
                          >
                            <p className="text-sm">
                              {field.quantity} {field.unit}{" "}
                              <span className="font-light">{field.name}</span>
                            </p>

                            <div className="flex items-center gap-1">
                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="outline"
                                      onClick={() => setIngredientToEdit(field)}
                                    >
                                      <Pencil className="size-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="outline"
                                      onClick={() =>
                                        setIngredientIdToDelete(field.id)
                                      }
                                    >
                                      <X className="size-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => setIsAddIngredientModalOpen(true)}
                    className="w-fit gap-2"
                  >
                    Add Ingredient
                    <Plus className="size-4" />
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="steps"
            render={({ field }) => (
              <FormItem className="w-fulls">
                <FormLabel>
                  <span className="text-red-500 text-[18px]">*</span>
                  Steps
                </FormLabel>

                <div className="border p-4 rounded-lg grid gap-5">
                  {field.value.length === 0 && (
                    <p className="text-muted-foreground text-sm italic">
                      No steps added
                    </p>
                  )}

                  {field.value.length > 0 && (
                    <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {field.value.map((field, index) => (
                        <li key={index}>{field.description}</li>
                      ))}
                    </ul>
                  )}
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => setIsAddStepModalOpen(true)}
                    className="w-fit gap-2"
                  >
                    Add Step
                    <Plus className="size-4" />
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-fit m-auto"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {form.formState.isSubmitting ? "Submitting..." : `${type} Recipe`}
          </Button>
        </form>
      </Form>

      <AlertDialog
        open={isAddIngredientModalOpen || ingredientToEdit !== null}
        onOpenChange={(open) => setIsAddIngredientModalOpen(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isAddIngredientModalOpen ? "Add" : "Edit"} Ingredient
            </AlertDialogTitle>

            <AlertDialogDescription>
              {isAddIngredientModalOpen
                ? "Add an ingredient to the recipe"
                : "Edit the ingredient"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <IngredientForm
            leftButton={{
              variant: "outline",
              onClick: () => {
                setIsAddIngredientModalOpen(false);
                setIngredientToEdit(null);
              },
            }}
            defaultValues={ingredientToEdit || undefined}
            onFormSubmit={ingredientFormSubmitHandler}
          />
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={ingredientIdToDelete !== null}
        onOpenChange={() => setIngredientIdToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You&apos;re about to delete an ingredient
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete this ingredient?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteIngredient(ingredientIdToDelete!);
                  setIngredientIdToDelete(null);
                }}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isAddStepModalOpen || stepToEdit !== null}
        onOpenChange={(open) => setIsAddStepModalOpen(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isAddStepModalOpen ? "Add" : "Edit"} Step
            </AlertDialogTitle>

            <AlertDialogDescription>
              {isAddStepModalOpen
                ? "Add an step to the recipe"
                : "Edit the step"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <StepForm
            leftButton={{
              variant: "outline",
              onClick: () => {
                setIsAddStepModalOpen(false);
                setStepToEdit(null);
              },
            }}
            defaultValues={stepToEdit || undefined}
            onFormSubmit={stepFormSubmitHandler}
          />
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={stepIdToDelete !== null}
        onOpenChange={() => setStepIdToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You&apos;re about to delete an step
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete this step?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteStep(stepIdToDelete!);
                  setStepIdToDelete(null);
                }}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
