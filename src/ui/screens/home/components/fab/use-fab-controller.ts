import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useFabController() {
  const { bottom } = useSafeAreaInsets()

  const bottomSheetRef = useRef<BottomSheetModal>(null)

  function openBottomSheet() {
    bottomSheetRef.current?.present()
  }

  return {
    bottom,
    bottomSheetRef,
    openBottomSheet,
  }
}
