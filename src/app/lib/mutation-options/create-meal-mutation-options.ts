import { MealsService } from '@app/services/meals-service'
import { mutationOptions } from '@tanstack/react-query'
import { getFileInfo } from '@ui/utils/get-file-info'

export const createMealMutationOptions = () =>
  mutationOptions({
    mutationFn: async (fileUri: string) => {
      const { size, type, name } = await getFileInfo(fileUri)

      const { mealId } = await MealsService.createMeal({
        file: {
          size,
          type,
          name,
          uri: fileUri,
        },
      })

      return {
        mealId,
      }
    },
  })
