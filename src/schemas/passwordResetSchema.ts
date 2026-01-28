import { z } from 'zod'

/**
 * Password reset form schema
 * Validates email, password, password confirmation, and token
 */
export const passwordResetSchema = z
  .object({
    email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),

    password: z
      .string()
      .min(1, 'Password wajib diisi')
      .min(8, 'Password minimal 8 karakter')
      .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf besar')
      .regex(/[a-z]/, 'Password harus mengandung minimal 1 huruf kecil')
      .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka'),

    password_confirmation: z.string().min(1, 'Konfirmasi password wajib diisi'),

    token: z.string().min(1, 'Token tidak valid'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['password_confirmation'],
  })

export const passwordResetInitialValues = {
  email: '',
  password: '',
  password_confirmation: '',
  token: '',
}

export type PasswordResetForm = z.infer<typeof passwordResetSchema>
