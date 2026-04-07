import { ActivityLevel } from '@app/types/activity-level'
import { Gender } from '@app/types/gender'
import { Goal } from '@app/types/goal'
import { z } from 'zod'

export const onboardingSchema = z.object({
  profile: z.object({
    birthDate: z.iso.datetime('Data de nascimento é obrigatória'),
    gender: z.enum(Gender),
    height: z.number().positive('Altura inválida'),
    weight: z.number().positive('Peso inválido'),
    activityLevel: z.enum(ActivityLevel),
    goal: z.enum(Goal),
  }),
  account: z
    .object({
      name: z.string().min(1, 'Nome é obrigatório'),
      email: z.email('Informe um e-mail válido'),
      password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
      confirmPassword: z.string().min(1, 'Confirme sua senha'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    }),
})

export type OnboardingSchema = z.infer<typeof onboardingSchema>
