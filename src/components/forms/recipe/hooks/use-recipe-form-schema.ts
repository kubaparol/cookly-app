import { z } from 'zod';

import { AdditionalDetailsStepFormSchema } from '../../AdditionalDetailsStepForm';
import { BasicInformationStepFormSchema } from '../../BasicInformationStepForm';
import { IngredientsStepFormSchema } from '../../IngredientsStepForm';
import { PreparationStepsFormSchema } from '../../PreparationStepsForm';
import { ReviewSubmitStepFormSchema } from '../../ReviewSubmitStepForm';
import { TimeServingsStepFormSchema } from '../../TimeServingsStepForm';

export const useRecipeFormSchema = () => {
  const recipeFormSchema = z.object({
    ...BasicInformationStepFormSchema.shape,
    ...TimeServingsStepFormSchema.shape,
    ...IngredientsStepFormSchema.shape,
    ...PreparationStepsFormSchema.shape,
    ...AdditionalDetailsStepFormSchema.shape,
    ...ReviewSubmitStepFormSchema.shape,
  });

  return {
    recipeFormSchema,
  };
};
