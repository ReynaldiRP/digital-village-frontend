import { reactive, computed, watch } from 'vue'
import type { z } from 'zod'

export interface UseZodFormOptions<T extends z.ZodObject<z.ZodRawShape>> {
  schema: T
  initialValues: z.infer<T>
  onSubmit?: (values: z.infer<T>) => void | Promise<void>
}

export interface FieldMeta {
  touched: boolean
  dirty: boolean
  valid: boolean
}

export function useZodForm<T extends z.ZodObject<z.ZodRawShape>>(options: UseZodFormOptions<T>) {
  type FormValues = z.infer<T>
  type FormKeys = keyof FormValues

  const { schema, initialValues, onSubmit } = options

  // Form values - reactive
  const values = reactive({ ...initialValues }) as FormValues

  // Store File objects separately to prevent Vue's reactive proxy from breaking them
  // Vue's reactive() deeply proxies objects, which breaks File instances
  const fileValues = new Map<string, File>()

  // Field errors
  const errors = reactive<Record<string, string>>({})

  // Field meta (touched, dirty, valid)
  const fieldMeta = reactive<Record<string, FieldMeta>>({})

  // Initialize field meta for all fields
  for (const key of Object.keys(initialValues as object)) {
    fieldMeta[key] = { touched: false, dirty: false, valid: false }
  }

  // Get values with File objects restored from separate storage
  const getValuesWithFiles = (): FormValues => {
    const result = { ...values } as Record<string, unknown>

    // Restore File objects from separate storage
    for (const [key, file] of fileValues.entries()) {
      result[key] = file
    }

    return result as FormValues
  }

  // Validate single field using full schema
  const validateField = async (field: FormKeys): Promise<boolean> => {
    const fieldKey = field as string

    // Get values with File objects restored for validation
    const valuesWithFiles = getValuesWithFiles()

    // Validate the entire form but only report error for this field
    const result = await schema.safeParseAsync(valuesWithFiles)

    if (result.success) {
      errors[fieldKey] = ''
      const meta = fieldMeta[fieldKey]
      if (meta) meta.valid = true
      return true
    }

    // Find error for this specific field
    const fieldError = result.error.issues.find((issue) => issue.path[0] === field)

    if (fieldError) {
      errors[fieldKey] = fieldError.message
      const meta = fieldMeta[fieldKey]
      if (meta) meta.valid = false
      return false
    } else {
      errors[fieldKey] = ''
      const meta = fieldMeta[fieldKey]
      if (meta) meta.valid = true
      return true
    }
  }

  // Validate all fields
  const validateForm = async (): Promise<boolean> => {
    const valuesWithFiles = getValuesWithFiles()
    const result = await schema.safeParseAsync(valuesWithFiles)

    if (result.success) {
      // Clear all errors
      for (const key of Object.keys(errors)) {
        errors[key] = ''
      }
      return true
    }

    // Set errors for each invalid field
    const errorMap: Record<string, string> = {}
    for (const issue of result.error.issues) {
      const path = issue.path.join('.')
      if (!errorMap[path]) {
        errorMap[path] = issue.message
      }
    }

    // Update errors and meta
    for (const key of Object.keys(values as object)) {
      if (errorMap[key]) {
        errors[key] = errorMap[key]
        if (fieldMeta[key]) {
          fieldMeta[key].valid = false
        }
      } else {
        errors[key] = ''
        if (fieldMeta[key]) {
          fieldMeta[key].valid = true
        }
      }
    }

    return false
  }

  // Mark field as touched
  const setTouched = (field: FormKeys) => {
    const fieldKey = field as string
    const meta = fieldMeta[fieldKey]
    if (meta) meta.touched = true
  }

  // Set field value - handles File objects specially
  const setFieldValue = <K extends FormKeys>(field: K, value: FormValues[K]) => {
    const fieldKey = field as string

    // If value is a File, store it separately to prevent proxy issues
    if (value instanceof File) {
      fileValues.set(fieldKey, value)
      // Store a marker in reactive values (for dirty checking, etc.)
      ;(values as Record<string, unknown>)[fieldKey] = `__file__${value.name}`
    } else if (value === null && fileValues.has(fieldKey)) {
      // Clear file if set to null
      fileValues.delete(fieldKey)
      ;(values as Record<string, unknown>)[fieldKey] = value
    } else {
      // For non-File values, store normally
      ;(values as Record<string, unknown>)[fieldKey] = value
      // Clear any previous file value
      fileValues.delete(fieldKey)
    }

    const meta = fieldMeta[fieldKey]
    if (meta) meta.dirty = true
  }

  // Get validation state for UI
  const getFieldValidationState = (field: FormKeys): 'valid' | 'invalid' | 'default' => {
    const meta = fieldMeta[field as string]
    const error = errors[field as string]

    if (!meta?.touched) return 'default'
    if (error) return 'invalid'
    if (meta.valid) return 'valid'

    return 'default'
  }

  // Handle blur - validate on blur
  const handleBlur = async (field: FormKeys) => {
    setTouched(field)
    await validateField(field)
  }

  // Handle input change with validation
  const handleChange = async <K extends FormKeys>(field: K, value: FormValues[K]) => {
    setFieldValue(field, value)
    // Only validate if already touched
    if (fieldMeta[field as string]?.touched) {
      await validateField(field)
    }
  }

  // Form meta - tracks overall form state
  const meta = computed(() => {
    const allTouched = Object.values(fieldMeta).every((m) => m?.touched)
    const hasErrors = Object.values(errors).some((e) => e !== '')
    const isDirty = Object.values(fieldMeta).some((m) => m?.dirty)

    // Check if form is valid by running schema validation synchronously
    const valuesWithFiles = getValuesWithFiles()
    const result = schema.safeParse(valuesWithFiles)

    return {
      touched: allTouched,
      valid: result.success && !hasErrors,
      dirty: isDirty,
    }
  })

  // Handle form submit
  const handleSubmit = async (e?: Event) => {
    e?.preventDefault()

    // Mark all fields as touched
    for (const key of Object.keys(fieldMeta)) {
      if (fieldMeta[key]) {
        fieldMeta[key].touched = true
      }
    }

    const isValid = await validateForm()

    if (isValid && onSubmit) {
      // Get values with File objects restored
      const finalValues = getValuesWithFiles()
      await onSubmit(finalValues)
    }

    return isValid
  }

  // Reset form
  const resetForm = () => {
    // Clear file storage
    fileValues.clear()

    for (const key of Object.keys(initialValues as object)) {
      ;(values as Record<string, unknown>)[key] = (initialValues as Record<string, unknown>)[key]
      errors[key] = ''
      fieldMeta[key] = { touched: false, dirty: false, valid: false }
    }
  }

  // Watch for value changes and validate touched fields
  watch(
    () => ({ ...values }),
    async (newValues, oldValues) => {
      for (const key of Object.keys(newValues as object)) {
        if (
          (newValues as Record<string, unknown>)[key] !==
            (oldValues as Record<string, unknown>)?.[key] &&
          fieldMeta[key]?.touched
        ) {
          await validateField(key as FormKeys)
        }
      }
    },
    { deep: true },
  )

  return {
    values,
    errors,
    meta,
    fieldMeta,
    validateField,
    validateForm,
    setTouched,
    setFieldValue,
    getFieldValidationState,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  }
}
