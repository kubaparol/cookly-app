import { z } from 'zod';

export const basicInformationStepFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title must be at most 255 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters')
    .or(z.literal('')),
  imageUrl: z.string().min(1, 'Image is required'),
  cuisineType: z.string().min(1, 'Cuisine Type is required'),
  mealType: z.string().min(1, 'Meal Type is required'),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
});

export const timeServingsStepFormSchema = z.object({
  preparationTime: z
    .string()
    .min(1, 'Preparation time is required')
    .regex(/^\d+$/, 'Must be a valid number')
    .refine((value) => Number(value) >= 1, {
      message: 'Must be at least 1 minute',
    }),
  cookingTime: z
    .string()
    .min(1, 'Cooking time is required')
    .regex(/^\d+$/, 'Must be a valid number')
    .refine((value) => Number(value) >= 1, {
      message: 'Must be at least 1 minute',
    }),
  restTime: z
    .string()
    .regex(/^\d*$/, 'Must be a valid number')
    .refine((value) => value === '' || Number(value) >= 1, {
      message: 'Must be at least 1 minute',
    })
    .optional(),
  activeTime: z
    .string()
    .regex(/^\d*$/, 'Must be a valid number')
    .refine((value) => value === '' || Number(value) >= 1, {
      message: 'Must be at least 1 minute',
    })
    .optional(),
  servings: z
    .string()
    .min(1, 'Number of servings is required')
    .regex(/^\d*$/, 'Must be a valid number')
    .refine((value) => value === '' || Number(value) >= 1, {
      message: 'Must be at least 1 serving',
    }),
  servingSize: z.string().min(1, 'Serving size is required').optional(),
  yield: z.string().min(1, 'Yield is required').optional(),
});

export const ingredientsStepFormSchema = z.object({
  ingredients: z.array(
    z.object({
      quantity: z
        .string()
        .min(0.1, 'Quantity is required')
        .regex(/^\d+(\.\d+)?$/, 'Must be a valid number')
        .refine((value) => value === '' || Number(value) >= 0.1, {
          message: 'Must be at least 0.1',
        }),
      unit: z.string().min(1, 'Unit is required'),
      name: z.string().min(1, 'Ingredient name is required'),
    }),
  ),
});

export const preparationStepsFormSchema = z.object({
  steps: z.array(
    z.object({
      description: z.string().min(1, 'Step description is required'),
    }),
  ),
});

export const additionalDetailsStepFormSchema = z.object({
  difficulty: z.string().min(1, 'Difficulty level is required'),
  dietaryTags: z.array(z.string()).min(1, 'At least one dietary tag is required'),
  notes: z.string().optional(),
  equipment: z
    .array(
      z.object({
        name: z.string().min(1, 'Equipment name is required'),
      }),
    )
    .optional()
    .transform((val) => val || []),
  storageInstructions: z.string().optional(),
  reheatingInstructions: z.string().optional(),
  makeAheadInstructions: z.string().optional(),
  substitutions: z
    .array(
      z.object({
        original: z.string().min(1, 'Original ingredient is required'),
        substitute: z.string().min(1, 'Substitute ingredient is required'),
      }),
    )
    .optional()
    .transform((val) => val || []),
  tipsAndTricks: z
    .array(
      z.object({
        description: z.string().min(1, 'Tip description is required'),
      }),
    )
    .optional()
    .transform((val) => val || []),
  calories: z.string().regex(/^\d*$/, 'Must be a valid number').optional(),
  protein: z
    .string()
    .regex(/^(\d*\.?\d*)$/, 'Must be a valid number')
    .optional(),
  carbs: z
    .string()
    .regex(/^(\d*\.?\d*)$/, 'Must be a valid number')
    .optional(),
  fat: z
    .string()
    .regex(/^(\d*\.?\d*)$/, 'Must be a valid number')
    .optional(),
  allergens: z.array(z.string()).optional(),
  seasonality: z.string().optional(),
  costLevel: z.string().optional(),
});

export const reviewSubmitStepFormSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export const recipeFormSchema = z.object({
  ...basicInformationStepFormSchema.shape,
  ...timeServingsStepFormSchema.shape,
  ...ingredientsStepFormSchema.shape,
  ...preparationStepsFormSchema.shape,
  ...additionalDetailsStepFormSchema.shape,
  ...reviewSubmitStepFormSchema.shape,
});

export type AdditionalDetailsStepFormValues = z.infer<typeof additionalDetailsStepFormSchema>;
export type BasicInformationStepFormValues = z.infer<typeof basicInformationStepFormSchema>;
export type IngredientsStepFormValues = z.infer<typeof ingredientsStepFormSchema>;
export type PreparationStepsFormValues = z.infer<typeof preparationStepsFormSchema>;
export type ReviewSubmitStepFormValues = z.infer<typeof reviewSubmitStepFormSchema>;
export type TimeServingsStepFormValues = z.infer<typeof timeServingsStepFormSchema>;
export type RecipeFormValues = z.infer<typeof recipeFormSchema>;
