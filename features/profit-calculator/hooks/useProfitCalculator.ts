"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { ProfitInputs, ProfitResults } from "../types"

export function useProfitCalculator() {
  const [inputs, setInputs] = useState<ProfitInputs>({
    shares: "",
    buyPrice: "",
    sellPrice: "",
    profitPercentage: "",
  })
  const [results, setResults] = useState<ProfitResults | null>(null)
  const [showToast, setShowToast] = useState(false)

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
      const profit = ((sell - buy) / buy) * 100
      setInputs((prev) => ({ ...prev, profitPercentage: profit.toFixed(2) }))
    } else if (buyPrice && profitPercentage && !sellPrice && isEffectRunning) {
      const buy = Number.parseFloat(buyPrice)
      const profit = Number.parseFloat(profitPercentage)
      const sell = buy * (1 + profit / 100)
      setInputs((prev) => ({ ...prev, sellPrice: sell.toFixed(2) }))
    }

    return () => {
      isEffectRunning = false
    }
  }, [inputs])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputs.shares === "" || inputs.buyPrice === "" || (inputs.sellPrice === "" && inputs.profitPercentage === "")) {
      alert("Please fill in Shares, Buy Price, and either Sell Price or Profit Percentage before calculating.")
      return
    }

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

    setResults({
      totalValue,
      sellPrice,
      profitPercentage,
      profitLossAmount,
    })
  }

  const handleReset = () => {
    setInputs({
      shares: "",
      buyPrice: "",
      sellPrice: "",
      profitPercentage: "",
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
