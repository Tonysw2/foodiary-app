import { Gender } from '@app/types/gender'
import { Button } from '@ui/components/button'
import { FormGroup } from '@ui/components/form-group'
import { Input } from '@ui/components/input'
import {
  RadioGroup,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupItemInfo,
  RadioGroupLabel,
} from '@ui/components/radio-group'
import { ScreenHeader } from '@ui/components/screen-header'
import { theme } from '@ui/styles/theme'
import { ChevronLeft, LogOut } from 'lucide-react-native'
import { Controller, FormProvider } from 'react-hook-form'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DateInput } from './components/date-input'
import { styles } from './styles'
import { useEditProfileController } from './use-edit-profile-controller'

const GENDER_OPTIONS: { value: Gender; icon: string; label: string }[] = [
  { value: Gender.MALE, icon: '👨', label: 'Masculino' },
  { value: Gender.FEMALE, icon: '👩', label: 'Feminino' },
]

export function EditProfile() {
  const { form, isPending, handleCancel, handleSignOut, handleSubmit } =
    useEditProfileController()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated translucent barStyle="dark-content" />

      <ScreenHeader
        title="Perfil"
        left={
          <Button
            size="icon"
            variant="ghost"
            onPress={handleCancel}
            disabled={isPending}
          >
            <ChevronLeft size={20} color={theme.colors.black[700]} />
          </Button>
        }
        right={
          <Button
            size="icon"
            variant="ghost"
            onPress={handleSignOut}
            disabled={isPending}
          >
            <LogOut size={20} color={theme.colors.black[700]} />
          </Button>
        }
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            <View style={styles.avatarSection}>
              <Image
                style={styles.avatar}
                source={{ uri: 'https://github.com/tonysw2.png' }}
              />
            </View>

            <FormProvider {...form}>
              <View style={styles.form}>
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormGroup label="Nome" error={fieldState.error?.message}>
                      <Input
                        value={field.value}
                        onChangeText={field.onChange}
                        placeholder="Seu nome"
                        editable={!isPending}
                      />
                    </FormGroup>
                  )}
                />

                <Controller
                  control={form.control}
                  name="birthDate"
                  render={({ field, fieldState }) => (
                    <FormGroup
                      label="Data de Nascimento"
                      error={fieldState.error?.message}
                    >
                      <DateInput
                        value={field.value}
                        onChange={field.onChange}
                        error={!!fieldState.error}
                        disabled={isPending}
                      />
                    </FormGroup>
                  )}
                />

                <Controller
                  control={form.control}
                  name="height"
                  render={({ field, fieldState }) => (
                    <FormGroup label="Altura" error={fieldState.error?.message}>
                      <Input
                        value={field.value ? String(field.value) : ''}
                        onChangeText={(val) => field.onChange(Number(val))}
                        keyboardType="numeric"
                        placeholder="0"
                        suffix="cm"
                        editable={!isPending}
                      />
                    </FormGroup>
                  )}
                />

                <Controller
                  control={form.control}
                  name="weight"
                  render={({ field, fieldState }) => (
                    <FormGroup label="Peso" error={fieldState.error?.message}>
                      <Input
                        value={field.value ? String(field.value) : ''}
                        onChangeText={(val) => field.onChange(Number(val))}
                        keyboardType="numeric"
                        placeholder="0"
                        suffix="kg"
                        editable={!isPending}
                      />
                    </FormGroup>
                  )}
                />

                <Controller
                  control={form.control}
                  name="gender"
                  render={({ field, fieldState }) => (
                    <FormGroup label="Sexo" error={fieldState.error?.message}>
                      <RadioGroup
                        orientation="horizontal"
                        value={field.value}
                        onValueChange={field.onChange}
                        error={!!fieldState.error}
                        disabled={isPending}
                      >
                        {GENDER_OPTIONS.map((option) => (
                          <RadioGroupItem
                            key={option.value}
                            value={option.value}
                          >
                            <RadioGroupIcon>{option.icon}</RadioGroupIcon>
                            <RadioGroupItemInfo>
                              <RadioGroupLabel>{option.label}</RadioGroupLabel>
                            </RadioGroupItemInfo>
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormGroup>
                  )}
                />
              </View>
            </FormProvider>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerButton}>
            <Button onPress={handleSubmit} isLoading={isPending}>
              Salvar alterações
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
