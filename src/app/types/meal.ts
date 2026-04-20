export type MealStatus =
  | 'PENDING'
  | 'QUEUED'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED'

export type MealInputType = 'PICTURE' | 'AUDIO'

export type Food = {
  name: string
  quantity: string
  calories: number
  proteins: number
  carbohydrates: number
  fats: number
}

export type Meal = {
  id: string
  status: MealStatus
  inputType: MealInputType
  name: string
  icon: string
  foods: Food[]
  createdAt: string
  inputFileURL: string
}

export type SimplifiedMeal = {
  id: string
  createdAt: string
  name: string
  icon: string
  foods: Meal['foods']
}
