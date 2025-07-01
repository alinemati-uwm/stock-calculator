"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { ProfitInputs, ProfitResults } from "../types"
import { useNotificationContext } from "../../../shared/providers/notification-provider"
import {
  validateRequiredFields,
  formatValidationMessage,
  validateNumericFields,
} from "../../../shared/utils/validation"

export function useProfitCalculator() {
  const [inputs, setInputs] = useState<ProfitInputs>({
    shares: "",
    buyPrice: "",
    sellPrice: "",
    profitPercentage: "",
  })
  const [results, setResults] = useState<ProfitResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { calculationSuccess, error: showError, formReset, info } = useNotificationContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "sellPrice" ? { profitPercentage: "" } : {}),
      ...(name === "profitPercentage" ? { sellPrice: "" } : {}),
    }))
  }

  useEffect(() => {
    const { buyPrice, sellPrice, profitPercentage } = inputs
    let isEffectRunning = true

    if (buyPrice && sellPrice && sellPrice !== "0" && isEffectRunning) {
      const buy = Number.parseFloat(buyPrice)
      const sell = Number.parseFloat(sellPrice)
      if (!isNaN(buy) && !isNaN(sell) && buy > 0) {
        const profit = ((sell - buy) / buy) * 100
        setInputs((prev) => ({ ...prev, profitPercentage: profit.toFixed(2) }))
      }
    } else if (buyPrice && profitPercentage && !sellPrice && isEffectRunning) {
      const buy = Number.parseFloat(buyPrice)
      const profit = Number.parseFloat(profitPercentage)
      if (!isNaN(buy) && !isNaN(profit) && buy > 0) {
        const sell = buy * (1 + profit / 100)
        setInputs((prev) => ({ ...prev, sellPrice: sell.toFixed(2) }))
      }
    }

    return () => {
      isEffectRunning = false
    }
  }, [inputs])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isCalculating) return

    setIsCalculating(true)

    // Check required fields (shares and buyPrice are always required)
    const requiredInputs = { shares: inputs.shares, buyPrice: inputs.buyPrice }
    const missingRequired = validateRequiredFields(requiredInputs)

    if (missingRequired.length > 0) {
      const errorMsg = formatValidationMessage(missingRequired)
      showError("Validation Error", errorMsg)
      setIsCalculating(false)
      return
    }

    // Check that either sellPrice or profitPercentage is provided
    if (inputs.sellPrice === "" && inputs.profitPercentage === "") {
      showError("Validation Error", "Please fill in either Sell Price or Profit Percentage before calculating.")
      setIsCalculating(false)
      return
    }

    // Validate numeric fields
    const allInputs = Object.fromEntries(Object.entries(inputs).filter(([_, value]) => value !== ""))
    const invalidFields = validateNumericFields(allInputs)

    if (invalidFields.length > 0) {
      const errorMsg = `Please enter valid positive numbers for: ${invalidFields.join(", ")}`
      showError("Invalid Input", errorMsg)
      setIsCalculating(false)
      return
    }

    try {
      const shares = Number(inputs.shares)
      const buyPrice = Number(inputs.buyPrice)
      let sellPrice = Number(inputs.sellPrice)
      let profitPercentage = Number(inputs.profitPercentage)

      if (inputs.sellPrice && !inputs.profitPercentage) {
        profitPercentage = ((sellPrice - buyPrice) / buyPrice) * 100
      } else if (!inputs.sellPrice && inputs.profitPercentage) {
        sellPrice = buyPrice * (1 + profitPercentage / 100)
      }

      const totalValue = shares * sellPrice
      const totalCost = shares * buyPrice
      const profitLossAmount = totalValue - totalCost

      const calculatedResults = {
        totalValue,
        sellPrice,
        profitPercentage,
        profitLossAmount,
      }

      setResults(calculatedResults)

      const isProfit = profitLossAmount >= 0
      const profitLossText = isProfit ? "Profit" : "Loss"

      calculationSuccess(
        "Profit Calculation",
        `${profitLossText} of $${Math.abs(profitLossAmount).toFixed(2)} (${Math.abs(profitPercentage).toFixed(2)}%) on ${shares} shares`,
      )
    } catch (err) {
      showError("Calculation Error", "An error occurred while calculating profit. Please check your inputs.")
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setInputs({
      shares: "",
      buyPrice: "",
      sellPrice: "",
      profitPercentage: "",
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
