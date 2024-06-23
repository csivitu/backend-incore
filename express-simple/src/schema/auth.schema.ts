import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string()
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string()
})

export { registerSchema, loginSchema }
