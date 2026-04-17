import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type AppStackParamList = {
  Home: undefined
  MealDetails: { mealId: string }
  EditGoals: undefined
  EditProfile: undefined
}

export type AppStackNavigationProps =
  NativeStackNavigationProp<AppStackParamList>
