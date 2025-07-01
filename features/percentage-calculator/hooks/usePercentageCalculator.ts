"use client"

import type React from "react"
import { useState } from "react"
import type { PercentageInputs, PercentageResults } from "../types"
import { useNotificationContext } from "../../../shared/providers/notification-provider"
import {
  validateRequiredFields,
  formatValidationMessage,
  validateNumericFields,
} from "../../../shared/utils/validation"

export function usePercentageCalculator() {
  const [inputs, setInputs] = useState<PercentageInputs>({
    initialValue: "",
    finalValue: "",
  })
  const [results, setResults] = useState<PercentageResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { calculationSuccess, error: showError, formReset, warning } = useNotificationContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isCalculating) return

    setIsCalculating(true)

    // Validate required fields
    const missingFields = validateRequiredFields(inputs)
    if (missingFields.length > 0) {
      const errorMsg = formatValidationMessage(missingFields)
      showError("Validation Error", errorMsg)
      setIsCalculating(false)
      return
    }

    // Validate numeric fields
    const invalidFields = validateNumericFields(inputs)
    if (invalidFields.length > 0) {
      const errorMsg = `Please enter valid numbers for: ${invalidFields.join(", ")}`
      showError("Invalid Input", errorMsg)
      setIsCalculating(false)
      return
    }

    try {
      const initialValue = Number(inputs.initialValue)
      const finalValue = Number(inputs.finalValue)

      if (initialValue === 0) {
        showError("Division by Zero", "Initial value cannot be zero for percentage calculation.")
        setIsCalculating(false)
        return
      }

      const percentageChange = ((finalValue - initialValue) / initialValue) * 100

      if (Math.abs(percentageChange) > 1000) {
        warning(
          "Large Percentage Change",
          "The calculated percentage change is very large. Please verify your input values.",
        )
      }

      const calculatedResults = { initialValue, finalValue, percentageChange }
      setResults(calculatedResults)

      const isIncrease = percentageChange >= 0
      const changeType = isIncrease ? "Increase" : "Decrease"

      calculationSuccess(
        "Percentage Change Calculation",
        `${changeType} of ${Math.abs(percentageChange).toFixed(2)}% from ${initialValue} to ${finalValue}`,
      )
    } catch (err) {
      showError("Calculation Error", "An error occurred while calculating percentage change. Please check your inputs.")
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setInputs({
      initialValue: "",
      finalValue: "",
    })
    setResults(null)
    setIsCalculating(false)
    formReset()
  }

  return {
    inputs,
    results,
    isCalculating,
    handleInputChange,
    handleSubmit,
    handleReset,
  }
}
