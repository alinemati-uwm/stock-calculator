"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoPopup } from "../../../shared/components/ui/info-popup"
import type { ProfitInputs } from "../types"

interface ProfitCalculatorFormProps {
  inputs: ProfitInputs
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
}

export function ProfitCalculatorForm({ inputs, onInputChange, onSubmit, onReset }: ProfitCalculatorFormProps) {
  const infoData = {
    title: "Profit Calculator",
    description: "Calculate your potential profit or loss from stock trades with automatic percentage calculations",
    howToUse: [
      "Enter the number of shares you own or plan to buy",
      "Input the price you bought the shares at (Buy Price)",
      "Either enter the selling price OR the desired profit percentage",
      "The calculator will automatically calculate the missing value",
      "Click Calculate to see your total profit/loss and percentage return",
    ],
    example: {
      title: "Apple Stock Profit Calculation",
      inputs: [
        { label: "Number of Shares", value: "100 shares" },
        { label: "Buy Price", value: "$150.00" },
        { label: "Sell Price", value: "$165.00" },
        { label: "Profit Percentage", value: "10% (auto-calculated)" },
      ],
      result: "Total Value: $16,500, Profit: $1,500 (10% gain)",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Profit Calculator
          <InfoPopup {...infoData} />
        </CardTitle>
        <CardDescription>Calculate your potential profit</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shares">Number of Shares</Label>
            <Input
              id="shares"
              name="shares"
              type="number"
              value={inputs.shares}
              onChange={onInputChange}
              placeholder="Enter number of shares (e.g., 100)"
              className="placeholder:text-muted-foreground placeholder:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buyPrice">Buy Price</Label>
            <Input
              id="buyPrice"
              name="buyPrice"
              type="number"
              value={inputs.buyPrice}
              onChange={onInputChange}
              step="0.01"
              placeholder="Enter buy price (e.g., 200)"
              className="placeholder:text-muted-foreground placeholder:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sellPrice">Sell Price</Label>
            <Input
              id="sellPrice"
              name="sellPrice"
              type="number"
              value={inputs.sellPrice}
              onChange={onInputChange}
              step="0.01"
              placeholder="Enter sell price (e.g., 220)"
              className="placeholder:text-muted-foreground placeholder:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profitPercentage">Profit Percentage</Label>
            <Input
              id="profitPercentage"
              name="profitPercentage"
              type="number"
              value={inputs.profitPercentage}
              onChange={onInputChange}
              step="0.01"
              placeholder="Enter desired profit percentage (e.g., 10)"
              className="placeholder:text-muted-foreground placeholder:opacity-50"
            />
          </div>
          <div className="flex space-x-4">
            <Button type="submit">Calculate</Button>
            <Button type="button" variant="outline" onClick={onReset}>
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
