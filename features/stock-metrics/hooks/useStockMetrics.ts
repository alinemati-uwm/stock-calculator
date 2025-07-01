"use client"

import type React from "react"

import { useState } from "react"
import type { StockInputs, StockResults } from "../types"
import { calculateStockMetrics } from "../../../shared/utils/stockCalculations"
import { INITIAL_INPUTS } from "../constants"

export function useStockMetrics() {
  const [inputs, setInputs] = useState<StockInputs>(INITIAL_INPUTS)
  const [results, setResults] = useState<StockResults | null>(null)
  const [error, setError] = useState<string | null>(null)

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
    setError(null)
  }

  return {
    inputs,
    results,
    error,
    handleInputChange,
    handleSubmit,
    handleReset,
  }
}
