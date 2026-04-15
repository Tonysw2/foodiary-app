import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type AppStackParamList = {
  Home: undefined
  MealDetails: { mealId: string }
}

export type AppStackNavigationProps =
  NativeStackNavigationProp<AppStackParamList>
