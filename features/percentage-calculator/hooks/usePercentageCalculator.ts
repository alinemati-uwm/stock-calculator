"use client"

import type React from "react"

import { useState } from "react"
import type { PercentageInputs, PercentageResults } from "../types"

export function usePercentageCalculator() {
  const [inputs, setInputs] = useState<PercentageInputs>({
    initialValue: "",
    finalValue: "",
  })
  const [results, setResults] = useState<PercentageResults | null>(null)
  const [showToast, setShowToast] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputs.initialValue === "" || inputs.finalValue === "") {
      alert("Please fill in both values before calculating.")
      return
    }

    const initialValue = Number(inputs.initialValue)
    const finalValue = Number(inputs.finalValue)
    const percentageChange = ((finalValue - initialValue) / initialValue) * 100

    setResults({ initialValue, finalValue, percentageChange })
  }

  const handleReset = () => {
    setInputs({
      initialValue: "",
      finalValue: "",
    })
    setResults(null)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return {
    inputs,
    results,
    showToast,
    handleInputChange,
    handleSubmit,
    handleReset,
  }
}
