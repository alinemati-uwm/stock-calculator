"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoPopup } from "../../../shared/components/ui/info-popup"
import { TooltipHelper } from "../../../shared/components/ui/tooltip-helper"
import type { ProfitInputs } from "../types"
import { Loader2 } from "lucide-react"

interface ProfitCalculatorFormProps {
  inputs: ProfitInputs
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
  isCalculating?: boolean
}

export function ProfitCalculatorForm({
  inputs,
  onInputChange,
  onSubmit,
  onReset,
  isCalculating = false,
}: ProfitCalculatorFormProps) {
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

  const fieldTooltips = {
    shares: "Total number of shares you own or plan to buy. This determines the scale of your investment.",
    buyPrice: "The price per share you paid when purchasing the stock. Used to calculate your cost basis.",
    sellPrice: "The price per share you plan to sell at. Leave empty if you want to use profit percentage instead.",
    profitPercentage:
      "Your desired profit percentage. Leave empty if you want to use sell price instead. The calculator will auto-fill the missing value.",
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
            <Label htmlFor="shares" className="flex items-center gap-2">
              Number of Shares
              <TooltipHelper content={fieldTooltips.shares} showIcon />
            </Label>
            <Input
              id="shares"
              name="shares"
              type="number"
              value={inputs.shares}
              onChange={onInputChange}
              placeholder="Enter number of shares (e.g., 100)"
              className="placeholder:text-muted-foreground placeholder:opacity-50"
              disabled={isCalculating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buyPrice" className="flex items-center gap-2">
              Buy Price
              <TooltipHelper content={fieldTooltips.buyPrice} showIcon />
            </Label>
            <Input
              id="buyPrice"
              name="buyPrice"
              type="number"
              value={inputs.buyPrice}
              onChange={onInputChange}
              step="0.01"
              placeholder="Enter buy price (e.g., 200)"
              className="placeholder:text-muted-foreground placeholder:opacity-50"
              disabled={isCalculating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sellPrice" className="flex items-center gap-2">
              Sell Price
              <TooltipHelper content={fieldTooltips.sellPrice} showIcon />
            </Label>
            <Input
              id="sellPrice"
              name="sellPrice"
              type="number"
              value={inputs.sellPrice}
              onChange={onInputChange}
              step="0.01"
              placeholder="Enter sell price (e.g., 220)"
              className="placeholder:text-muted-foreground placeholder:opacity-50"
              disabled={isCalculating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profitPercentage" className="flex items-center gap-2">
              Profit Percentage
              <TooltipHelper content={fieldTooltips.profitPercentage} showIcon />
            </Label>
            <Input
              id="profitPercentage"
              name="profitPercentage"
              type="number"
              value={inputs.profitPercentage}
              onChange={onInputChange}
              step="0.01"
              placeholder="Enter desired profit percentage (e.g., 10)"
              className="placeholder:text-muted-foreground placeholder:opacity-50"
              disabled={isCalculating}
            />
          </div>
          <div className="flex space-x-4">
            <TooltipHelper content="Calculate profit/loss based on your inputs">
              <Button type="submit" disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate"
                )}
              </Button>
            </TooltipHelper>
            <TooltipHelper content="Clear all fields and start over">
              <Button type="button" variant="outline" onClick={onReset} disabled={isCalculating}>
                Reset
              </Button>
            </TooltipHelper>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
