import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import bgImage from '@ui/assets/greetings-bg/image.png'
import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { Logo } from '@ui/components/logo'
import { theme } from '@ui/styles/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

export function Greetings() {
  return (
    <>
      <ImageBackground
        source={bgImage}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={styles.fade}
        />
        <SafeAreaView style={styles.content}>
          <Logo />

          <View style={styles.ctaContainer}>
            <AppText
              color={theme.colors.white}
              size="3xl"
              weight="semiBold"
              style={styles.heading}
            >
              Controle sua dieta de forma simples
            </AppText>

            <View style={styles.ctaContent}>
              <Button>Criar conta</Button>

              <View style={styles.signInContainer}>
                <AppText color={theme.colors.white}>Já tem conta?</AppText>
                <TouchableOpacity>
                  <AppText color={theme.colors.lime['500']} weight="medium">
                    Acesse sua conta
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <BottomSheet>
        <BottomSheetView>
          <Button>Close this sheet</Button>
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}
