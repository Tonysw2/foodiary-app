import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { FormGroup } from '@ui/components/form-group'
import { Input } from '@ui/components/input'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'
import { styles } from './styles'
import { useSignInBottomSheetController } from './use-sign-in-bottom-sheet-controller'

export interface ISignInBottomSheet {
  open: () => void
}

interface ISignInBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
  const { form, bottomSheetRef, passwordInputRef, bottom, onSubmit } =
    useSignInBottomSheetController(ref)

  return (
    <BottomSheetModal ref={bottomSheetRef}>
      <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
        <AppText size="xl" weight="semiBold" style={styles.heading}>
          Acesse a sua conta
        </AppText>

        <View style={styles.form}>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormGroup label="E-mail" error={fieldState.error?.message}>
                <Input
                  InputComponent={BottomSheetTextInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormGroup label="Senha" error={fieldState.error?.message}>
                <Input
                  ref={passwordInputRef}
                  InputComponent={BottomSheetTextInput}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="current-password"
                  returnKeyType="done"
                  onEndEditing={onSubmit}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Button onPress={onSubmit} isLoading={form.formState.isSubmitting}>
            Entrar
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}
