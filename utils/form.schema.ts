import { z } from "zod";

export const zodSchema = z.object({
  email: z.string().min(1, 'Email is required!').max(40, "no máximo 40 caracteres"),
  password: z.string().min(1, 'Password is required!').max(12, "No máximo 12 caracteres")
})