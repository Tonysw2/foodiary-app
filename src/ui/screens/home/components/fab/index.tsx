import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { CreateMealOptions } from '@ui/components/create-meal-options'
import { Plus } from 'lucide-react-native'
import { View } from 'react-native'
import { styles } from './styles'
import { useFabController } from './use-fab-controller'

export function Fab() {
  const { bottom, bottomSheetRef, openBottomSheet } = useFabController()

  return (
    <>
      <View style={styles.container}>
        <Button size="icon" onPress={openBottomSheet}>
          <Plus />
        </Button>
      </View>

      <BottomSheetModal ref={bottomSheetRef} style={styles.bottomSheetModal}>
        <BottomSheetView style={[styles.content, { paddingBottom: bottom }]}>
          <AppText style={{ letterSpacing: -0.4 }} size="lg" weight="semiBold">
            Cadastre sua refeição
          </AppText>

          <CreateMealOptions />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}
