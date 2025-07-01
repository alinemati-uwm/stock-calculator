"use client"

import type React from "react"
import { useState } from "react"
import type { AverageInputs, AverageResults } from "../types"
import { useNotificationContext } from "../../../shared/providers/notification-provider"
import {
  validateRequiredFields,
  formatValidationMessage,
  validateNumericFields,
} from "../../../shared/utils/validation"

export function useAverageCalculator() {
  const [inputs, setInputs] = useState<AverageInputs>({
    currentShares: "",
    currentAverage: "",
    newShares: "",
    newPrice: "",
  })
  const [results, setResults] = useState<AverageResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { calculationSuccess, error: showError, formReset, info } = useNotificationContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
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
      const errorMsg = `Please enter valid positive numbers for: ${invalidFields.join(", ")}`
      showError("Invalid Input", errorMsg)
      setIsCalculating(false)
      return
    }

    try {
      const currentShares = Number(inputs.currentShares)
      const currentAverage = Number(inputs.currentAverage)
      const newShares = Number(inputs.newShares)
      const newPrice = Number(inputs.newPrice)

      // Additional validation
      if (currentShares <= 0 || newShares <= 0) {
        showError("Invalid Shares", "Number of shares must be greater than zero.")
        setIsCalculating(false)
        return
      }

      const currentCost = currentShares * currentAverage
      const newCost = newShares * newPrice
      const totalCost = currentCost + newCost
      const totalShares = currentShares + newShares
      const newAverage = totalCost / totalShares

      const calculatedResults = {
        newAverage,
        totalShares,
        totalCost,
      }

      setResults(calculatedResults)

      const averageChange = newAverage - currentAverage
      const changeDirection = averageChange > 0 ? "increased" : "decreased"
      const changeAmount = Math.abs(averageChange)

      calculationSuccess(
        "Average Price Calculation",
        `New average: $${newAverage.toFixed(2)} with ${totalShares} total shares. Average ${changeDirection} by $${changeAmount.toFixed(2)}`,
      )

      // Additional info about the purchase
      if (newPrice > currentAverage) {
        info("Purchase Above Average", `You're buying above your current average of $${currentAverage.toFixed(2)}`)
      } else {
        info(
          "Purchase Below Average",
          `You're buying below your current average of $${currentAverage.toFixed(2)} - good dollar-cost averaging!`,
        )
      }
    } catch (err) {
      showError("Calculation Error", "An error occurred while calculating the average price. Please check your inputs.")
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setInputs({
      currentShares: "",
      currentAverage: "",
      newShares: "",
      newPrice: "",
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
