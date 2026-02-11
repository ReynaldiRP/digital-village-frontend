import { z } from 'zod'

// Custom toTypedSchema for Zod v4 + VeeValidate integration
type ValidationResult = {
  errors: Array<{ path: string; message: string }>
}

export const toTypedSchema = <T extends z.ZodType>(zodSchema: T) => {
  return {
    async validate(value: unknown): Promise<ValidationResult> {
      const result = await zodSchema.safeParseAsync(value)

      if (result.success) {
        return { errors: [] }
      }

      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }))

      return { errors }
    },
    parse: zodSchema.parse.bind(zodSchema),
  }
}

export const familyMemberFormSchema = z.object({
  profile_picture: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, 'Ukuran file maksimal 5MB')
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Format file harus JPG, PNG, atau WebP',
    ),
  gender: z.enum(['male', 'female'], 'Jenis kelamin wajib dipilih'),
  name: z
    .string()
    .min(1, 'Nama wajib diisi')
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter')
    .regex(/^[a-zA-Z\s'.]+$/, 'Nama hanya boleh berisi huruf, spasi, titik, dan apostrof'),
  identify_number: z
    .string()
    .min(1, 'NIK wajib diisi')
    .length(16, 'NIK harus 16 digit')
    .regex(/^\d+$/, 'NIK hanya boleh berisi angka'),
  occupation: z
    .string()
    .min(1, 'Pekerjaan wajib diisi')
    .min(2, 'Pekerjaan minimal 2 karakter')
    .max(100, 'Pekerjaan maksimal 100 karakter'),
  birth_date: z
    .string()
    .min(1, 'Tanggal lahir wajib diisi')
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      return birthDate < today
    }, 'Tanggal lahir tidak boleh di masa depan')
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 1
    }, 'Usia minimal 1 tahun'),
  marital_status: z.enum(['single', 'married'], 'Status wajib dipilih'),
  relation_to_head: z.enum(
    ['wife', 'husband', 'child'],
    'Hubungan dengan kepala keluarga wajib dipilih',
  ),
  phone_number: z
    .string()
    .min(1, 'Nomor HP wajib diisi')
    .min(10, 'Nomor HP minimal 10 digit')
    .max(15, 'Nomor HP maksimal 15 digit')
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, 'Format nomor HP tidak valid'),
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
})

export const familyMemberValidationSchema = toTypedSchema(familyMemberFormSchema)

export type FamilyMemberFormData = z.infer<typeof familyMemberFormSchema>

export const familyMemberInitialValues: FamilyMemberFormData = {
  profile_picture: null,
  gender: 'male',
  name: '',
  identify_number: '',
  occupation: '',
  birth_date: '',
  marital_status: 'single',
  relation_to_head: 'child',
  phone_number: '',
  email: '',
}
