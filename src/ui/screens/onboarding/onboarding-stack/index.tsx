import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ActivityLevelStep } from '@ui/screens/onboarding/steps/activity-level'
import { BirthDateStep } from '@ui/screens/onboarding/steps/birth-date'
import { CreateAccountStep } from '@ui/screens/onboarding/steps/create-account'
import { GenderStep } from '@ui/screens/onboarding/steps/gender'
import { GoalStep } from '@ui/screens/onboarding/steps/goal'
import { HeightStep } from '@ui/screens/onboarding/steps/height'
import { WeightStep } from '@ui/screens/onboarding/steps/weight'
import type { OnboardingStackParamList } from './types'

const Stack = createNativeStackNavigator<OnboardingStackParamList>()

export const onboardingNavigationRef =
  createNavigationContainerRef<OnboardingStackParamList>()

export function OnboardingStack() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={onboardingNavigationRef}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Goal"
        >
          <Stack.Screen name="ActivityLevel" component={ActivityLevelStep} />
          <Stack.Screen name="BirthDate" component={BirthDateStep} />
          <Stack.Screen name="CreateAccount" component={CreateAccountStep} />
          <Stack.Screen name="Gender" component={GenderStep} />
          <Stack.Screen name="Goal" component={GoalStep} />
          <Stack.Screen name="Height" component={HeightStep} />
          <Stack.Screen name="Weight" component={WeightStep} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  )
}
