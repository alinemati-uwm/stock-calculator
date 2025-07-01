"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoPopup } from "../../../shared/components/ui/info-popup"
import type { AverageInputs } from "../types"

interface AverageCalculatorFormProps {
  inputs: AverageInputs
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
}

export function AverageCalculatorForm({ inputs, onInputChange, onSubmit, onReset }: AverageCalculatorFormProps) {
  const infoData = {
    title: "Average Price Calculator",
    description:
      "Calculate your new average cost per share when buying additional shares at different prices - essential for dollar-cost averaging strategies",
    howToUse: [
      "Enter your current number of shares you already own",
      "Input your current average price per share",
      "Enter the number of new shares you want to buy",
      "Input the price per share for the new purchase",
      "Click Calculate to see your new weighted average price",
    ],
    example: {
      title: "Adding to Your Microsoft Position",
      inputs: [
        { label: "Current Shares", value: "400 shares" },
        { label: "Current Average Price", value: "$320.00" },
        { label: "New Shares to Buy", value: "200 shares" },
        { label: "New Purchase Price", value: "$310.00" },
      ],
      result: "New Average: $316.67, Total Shares: 600, Total Investment: $190,000",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Average Price Calculator
          <InfoPopup {...infoData} />
        </CardTitle>
        <CardDescription>Calculate new average when buying more shares</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentShares">Current Shares</Label>
              <Input
                id="currentShares"
                name="currentShares"
                type="number"
                value={inputs.currentShares}
                onChange={onInputChange}
                placeholder="e.g., 400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentAverage">Current Average Price</Label>
              <Input
                id="currentAverage"
                name="currentAverage"
                type="number"
                value={inputs.currentAverage}
                onChange={onInputChange}
                step="0.01"
                placeholder="e.g., 320"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newShares">New Shares to Buy</Label>
              <Input
                id="newShares"
                name="newShares"
                type="number"
                value={inputs.newShares}
                onChange={onInputChange}
                placeholder="e.g., 200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPrice">New Purchase Price</Label>
              <Input
                id="newPrice"
                name="newPrice"
                type="number"
                value={inputs.newPrice}
                onChange={onInputChange}
                step="0.01"
                placeholder="e.g., 310"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <Button type="submit">Calculate Average</Button>
            <Button type="button" variant="outline" onClick={onReset}>
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
