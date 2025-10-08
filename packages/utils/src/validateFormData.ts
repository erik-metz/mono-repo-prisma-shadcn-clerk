import { z } from 'zod'

/**
 * Validates form data against a given schema.
 *
 * @param {FormData} formData - The form data to validate.
 * @param {z.ZodType} schema - The schema to validate the form data against.
 * @returns An object with a success flag and either the validated data or an error message.
 */
export function validateFormData<T extends z.ZodType>(
  formData: FormData,
  schema: T
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  const data: Record<string, string | unknown> = {}

  formData.forEach((value, key) => {
    // Handle values
    const strValue = value.toString()

    // Handle explicit null values
    if (strValue === 'null') {
      data[key] = null
    }
    // Only process non-empty values
    else if (strValue !== '') {
      try {
        // Convert boolean strings to actual booleans
        if (strValue === 'true') {
          data[key] = true
        } else if (strValue === 'false') {
          data[key] = false
        }
        // Convert to numbers if it’s a valid number
        else if (!isNaN(Number(strValue)) && strValue.trim() !== '') {
          data[key] = Number(strValue)
        }
        // Check if strValue is a date string
        else if (
          /^".*"$/.test(strValue) && // Check if it's enclosed in double quotes
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(
            strValue.slice(1, -1) // Check the content inside the quotes
          )
        ) {
          data[key] = new Date(strValue.slice(1, -1)) // Remove outer quotes and convert to Date
        } else {
          // Attempt to parse JSON strings (for arrays and objects)
          if (/^\[.*\]$|^\{.*\}$/.test(strValue)) {
            try {
              data[key] = JSON.parse(strValue)
            } catch {
              data[key] = strValue
            }
          } else {
            data[key] = strValue
          }
        }
      } catch {
        // If any parsing fails, use the original string value
        data[key] = strValue
      }
    }
  })

  if (process.env.NODE_ENV === 'development') {
    console.log('in validateFormData', { parsedFormdata: data })
  }

  const validatedFields = schema.safeParse(data)

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten()
    console.error(validatedFields.error)
    const errorMessages = Object.values(errors.fieldErrors)
      .flat()
      .concat(errors.formErrors)
      .join(', ')
    return { success: false, error: errorMessages }
  }

  return { success: true, data: validatedFields.data }
}

/**
 * Generates form data by including non string values.
 *
 * @param {Record<string, any>} formValues - All values of the form also non string ones.
 * @returns Formdata where the non string values have been sringified.
 */
export function generateFormData(formValues: Record<string, unknown>) {
  const formData = new FormData()
  Object.entries(formValues).forEach(([key, value]) => {
    // Handle null values explicitly for nullable fields

    if (value === null) {
      formData.append(key, 'null')
    }
    // Only add non-empty values to FormData
    else if (value !== undefined && value !== '') {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value.toString()) // force everything else to a string
      }
    }
  })
  return formData
}
