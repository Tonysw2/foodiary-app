import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { AppText } from '@ui/components/app-text'
import { inputStyles } from '@ui/components/input/styles'
import { theme } from '@ui/styles/theme'
import { CalendarDays } from 'lucide-react-native'
import { useState } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

interface DateInputProps {
  value: string
  onChange: (iso: string) => void
  error?: boolean
  disabled?: boolean
}

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function DateInput({
  value,
  onChange,
  error,
  disabled,
}: DateInputProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const date = new Date(value)

  function handleChange(_: DateTimePickerEvent, selected?: Date) {
    if (Platform.OS === 'android') {
      setIsPickerOpen(false)
    }
    if (selected) {
      onChange(selected.toISOString())
    }
  }

  return (
    <View>
      <Pressable
        onPress={() => !disabled && setIsPickerOpen(true)}
        style={[
          inputStyles({
            disabled: disabled ? 'true' : 'false',
            status: error ? 'error' : 'default',
            hasSuffix: 'true',
          }),
          styles.container,
        ]}
      >
        <AppText color={theme.colors.black[700]}>{formatDate(date)}</AppText>
        <CalendarDays size={20} color={theme.colors.black[700]} />
      </Pressable>

      {isPickerOpen && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={handleChange}
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          maximumDate={new Date()}
          // style={{ flex: 1, width: '100%', backgroundColor: 'red' }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: {
    borderColor: theme.colors.support.red,
  },
  disabled: {
    opacity: 0.5,
  },
})
