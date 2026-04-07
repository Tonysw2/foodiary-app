import z from 'zod'

const envSchema = z
  .object({
    EXPO_PUBLIC_API_URL: z.url(),
  })
  .transform((data) => ({
    api: {
      url: data.EXPO_PUBLIC_API_URL,
    },
  }))

export const env = envSchema.parse(process.env)
