export type Meal = {
  id: string
  createdAt: string
  name: string
  icon: string
  foods: {
    name: string
    quantity: string
    calories: number
    proteins: number
    carbohydrates: number
    fats: number
  }[]
}
