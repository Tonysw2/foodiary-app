import { Button } from '@ui/components/button'
import { FormGroup } from '@ui/components/form-group'
import { Input } from '@ui/components/input'
import { ScreenHeader } from '@ui/components/screen-header'
import { theme } from '@ui/styles/theme'
import { ChevronLeft } from 'lucide-react-native'
import { Controller, FormProvider } from 'react-hook-form'
import { StatusBar, View } from 'react-native'
import { styles } from './styles'
import { useEditGoalsController } from './use-edit-goals-controller'

export function EditGoals() {
  const { top, bottom, form, isPending, handleCancel, handleSubmit } =
    useEditGoalsController()

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar animated translucent barStyle="dark-content" />

      <ScreenHeader
        title="Suas Metas"
        left={
          <Button size="icon" variant="ghost" onPress={handleCancel}>
            <ChevronLeft size={20} color={theme.colors.black[700]} />
          </Button>
        }
      />

      <FormProvider {...form}>
        <View style={styles.form}>
          <Controller
            control={form.control}
            name="calories"
            render={({ field, fieldState }) => (
              <FormGroup label="Calorias" error={fieldState.error?.message}>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="numeric"
                  placeholder="0"
                  suffix="kcal"
                  editable={!isPending}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="carbohydrates"
            render={({ field, fieldState }) => (
              <FormGroup label="Carboidratos" error={fieldState.error?.message}>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="numeric"
                  placeholder="0"
                  suffix="g"
                  editable={!isPending}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="proteins"
            render={({ field, fieldState }) => (
              <FormGroup label="Proteínas" error={fieldState.error?.message}>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="numeric"
                  placeholder="0"
                  suffix="g"
                  editable={!isPending}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="fats"
            render={({ field, fieldState }) => (
              <FormGroup label="Gorduras" error={fieldState.error?.message}>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="numeric"
                  placeholder="0"
                  suffix="g"
                  editable={!isPending}
                />
              </FormGroup>
            )}
          />
        </View>
      </FormProvider>

      <View style={[styles.footer, { paddingBottom: 16 + bottom }]}>
        <View style={styles.footerButton}>
          <Button
            variant="secondary"
            onPress={handleCancel}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </View>

        <View style={styles.footerButton}>
          <Button onPress={handleSubmit} isLoading={isPending}>
            Salvar
          </Button>
        </View>
      </View>
    </View>
  )
}
