interface CookingTimeParams {
  preparationTime?: number | string;
  cookingTime?: number | string;
  restTime?: number | string;
}

/**
 * Calculates total cooking time based on preparation, cooking and rest time
 * @param params Object containing preparation, cooking and rest time
 * @returns Total time in minutes
 */
export function getTotalCookingTime({
  preparationTime,
  cookingTime,
  restTime,
}: CookingTimeParams): number {
  return (Number(preparationTime) || 0) + (Number(cookingTime) || 0) + (Number(restTime) || 0);
}
