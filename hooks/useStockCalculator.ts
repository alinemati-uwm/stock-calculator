"use client"

import type React from "react"

import { useState } from "react"
import type { StockInputs, StockResults, ProfitResults, PercentageResults, AverageResults } from "../types/calculator"
import { calculateStockMetrics } from "../utils/stockCalculations"
import { INITIAL_INPUTS } from "../constants/placeholders"

export function useStockCalculator() {
  const [inputs, setInputs] = useState<StockInputs>(INITIAL_INPUTS)
  const [results, setResults] = useState<StockResults | null>(null)
  const [profitResults, setProfitResults] = useState<ProfitResults | null>(null)
  const [percentageResults, setPercentageResults] = useState<PercentageResults | null>(null)
  const [averageResults, setAverageResults] = useState<AverageResults | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number.parseFloat(e.target.value)
    setInputs((prev) => ({ ...prev, [e.target.name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (Object.values(inputs).some((value) => value === "")) {
      setError("Please fill in all fields before calculating.")
      return
    }
    try {
      const calculatedResults = calculateStockMetrics(inputs as Required<StockInputs>)
      setResults(calculatedResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    }
  }

  const handleReset = () => {
    setInputs(INITIAL_INPUTS)
    setResults(null)
    setProfitResults(null)
    setPercentageResults(null)
    setAverageResults(null)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return {
    inputs,
    results,
    profitResults,
    percentageResults,
    averageResults,
    error,
    showToast,
    handleInputChange,
    handleSubmit,
    handleReset,
    setProfitResults,
    setPercentageResults,
    setAverageResults,
  }
}
