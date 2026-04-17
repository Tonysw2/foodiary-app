import { Gender } from '@app/types/gender'
import { z } from 'zod'

export const editProfileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.iso.datetime('Data de nascimento é obrigatória'),
  gender: z.enum(Gender),
  height: z.number({ error: 'Altura inválida' }).positive('Altura inválida'),
  weight: z.number({ error: 'Peso inválido' }).positive('Peso inválido'),
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>
