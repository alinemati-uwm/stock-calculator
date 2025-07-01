export function validateRequiredFields(inputs: Record<string, string | number>): string[] {
  const missingFields: string[] = []

  Object.entries(inputs).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) {
      // Convert camelCase to readable format
      const fieldName = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/([a-z])([A-Z])/g, "$1 $2")

      missingFields.push(fieldName)
    }
  })

  return missingFields
}

export function formatValidationMessage(missingFields: string[]): string {
  if (missingFields.length === 0) return ""

  if (missingFields.length === 1) {
    return `Please fill in the ${missingFields[0]} field before calculating.`
  }

  if (missingFields.length === 2) {
    return `Please fill in the ${missingFields[0]} and ${missingFields[1]} fields before calculating.`
  }

  const lastField = missingFields.pop()
  return `Please fill in the ${missingFields.join(", ")}, and ${lastField} fields before calculating.`
}

export function validateNumericFields(inputs: Record<string, string | number>): string[] {
  const invalidFields: string[] = []

  Object.entries(inputs).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      const numValue = Number(value)
      if (isNaN(numValue) || numValue < 0) {
        const fieldName = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
        invalidFields.push(fieldName)
      }
    }
  })

  return invalidFields
}
