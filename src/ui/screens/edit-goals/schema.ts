import { z } from 'zod'

export const editGoalsSchema = z.object({
  calories: z.string().min(1, 'Calorias é obrigatório'),
  carbohydrates: z.string().min(1, 'Carboidratos é obrigatório'),
  proteins: z.string().min(1, 'Proteínas é obrigatório'),
  fats: z.string().min(1, 'Gorduras é obrigatório'),
})

export type EditGoalsSchema = z.infer<typeof editGoalsSchema>
