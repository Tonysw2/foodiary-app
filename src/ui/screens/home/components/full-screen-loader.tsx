import { theme } from '@ui/styles/theme'
import { Loader2Icon } from 'lucide-react-native'
import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

export function FullScreenLoader() {
  const rotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }, [rotation])

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Loader2Icon size={20} color={theme.colors.white} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.lime[700],
  },
})
