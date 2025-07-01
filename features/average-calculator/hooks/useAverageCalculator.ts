"use client"

import type React from "react"

import { useState } from "react"
import type { AverageInputs, AverageResults } from "../types"

export function useAverageCalculator() {
  const [inputs, setInputs] = useState<AverageInputs>({
    currentShares: "",
    currentAverage: "",
    newShares: "",
    newPrice: "",
  })
  const [results, setResults] = useState<AverageResults | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(inputs).some((value) => value === "")) {
      alert("Please fill in all fields before calculating.")
      return
    }

    const currentShares = Number(inputs.currentShares)
    const currentAverage = Number(inputs.currentAverage)
    const newShares = Number(inputs.newShares)
    const newPrice = Number(inputs.newPrice)

    const currentCost = currentShares * currentAverage
    const newCost = newShares * newPrice
    const totalCost = currentCost + newCost
    const totalShares = currentShares + newShares
    const newAverage = totalCost / totalShares

    setResults({
      newAverage,
      totalShares,
      totalCost,
    })
  }

  const handleReset = () => {
    setInputs({
      currentShares: "",
      currentAverage: "",
      newShares: "",
      newPrice: "",
    })
    setResults(null)
  }

  return {
    inputs,
    results,
    handleInputChange,
    handleSubmit,
    handleReset,
  }
}
