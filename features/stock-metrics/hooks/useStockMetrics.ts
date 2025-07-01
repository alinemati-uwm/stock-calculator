"use client"

import type React from "react"
import { useState } from "react"
import type { StockInputs, StockResults } from "../types"
import { calculateStockMetrics } from "../../../shared/utils/stockCalculations"
import { useNotificationContext } from "../../../shared/providers/notification-provider"
import {
  validateRequiredFields,
  formatValidationMessage,
  validateNumericFields,
} from "../../../shared/utils/validation"
import { INITIAL_INPUTS } from "../constants"

export function useStockMetrics() {
  const [inputs, setInputs] = useState<StockInputs>(INITIAL_INPUTS)
  const [results, setResults] = useState<StockResults | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { calculationSuccess, error: showError, formReset, warning } = useNotificationContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseFloat(e.target.value)
    setInputs((prev) => ({ ...prev, [e.target.name]: value }))

    // Clear previous error when user starts typing
    if (error) {
      setError(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isCalculating) return // Prevent multiple submissions

    setError(null)
    setIsCalculating(true)

    // Validate required fields
    const missingFields = validateRequiredFields(inputs)
    if (missingFields.length > 0) {
      const errorMsg = formatValidationMessage(missingFields)
      setError(errorMsg)
      showError("Validation Error", errorMsg)
      setIsCalculating(false)
      return
    }

    // Validate numeric fields
    const invalidFields = validateNumericFields(inputs)
    if (invalidFields.length > 0) {
      const errorMsg = `Please enter valid positive numbers for: ${invalidFields.join(", ")}`
      setError(errorMsg)
      showError("Invalid Input", errorMsg)
      setIsCalculating(false)
      return
    }

    // Additional business logic validation
    const maxPrice = Number(inputs.maxPrice)
    const minPrice = Number(inputs.minPrice)
    const numberOfDivision = Number(inputs.numberOfDivision)

    if (maxPrice <= minPrice) {
      const errorMsg = "Max price must be greater than min price."
      setError(errorMsg)
      showError("Invalid Range", errorMsg)
      setIsCalculating(false)
      return
    }

    if (numberOfDivision < 2) {
      const errorMsg = "Number of divisions must be at least 2."
      setError(errorMsg)
      showError("Invalid Division", errorMsg)
      setIsCalculating(false)
      return
    }

    if (numberOfDivision > 50) {
      warning("High Division Count", "Using more than 50 divisions may result in very small position sizes.")
    }

    try {
      const calculatedResults = calculateStockMetrics(inputs as Required<StockInputs>)
      setResults(calculatedResults)

      calculationSuccess(
        "Stock Metrics Calculation",
        `Strategy created with ${calculatedResults.totalShares} shares, weighted average $${calculatedResults.weightedAverage.toFixed(2)}, and potential profit of $${calculatedResults.totalProfit.toFixed(2)}`,
      )
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred during calculation"
      setError(errorMsg)
      showError("Calculation Error", errorMsg)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setInputs(INITIAL_INPUTS)
    setResults(null)
    setError(null)
    setIsCalculating(false)
    formReset()
  }

  return {
    inputs,
    results,
    error,
    isCalculating,
    handleInputChange,
    handleSubmit,
    handleReset,
  }
}
