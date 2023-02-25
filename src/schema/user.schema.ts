import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(2),
  password: z.string().min(2)
})

export type IRegister = z.infer<typeof RegisterSchema>