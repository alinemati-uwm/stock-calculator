"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoPopup } from "../../../shared/components/ui/info-popup"
import type { StockInputs } from "../types"
import { STOCK_PLACEHOLDERS } from "../constants"

interface StockInputFormProps {
  inputs: StockInputs
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
}

export function StockInputForm({ inputs, onInputChange, onSubmit, onReset }: StockInputFormProps) {
  const infoData = {
    title: "Stock Metrics Calculator",
    description: "Calculate optimal stock purchase strategy using dollar-cost averaging with multiple price points",
    howToUse: [
      "Enter the highest price you're willing to pay (Max Price)",
      "Enter the lowest price you expect the stock to reach (Min Price)",
      "Set your total number of shares to purchase (Total Stock Count)",
      "Choose how many price divisions to create (Number of Division)",
      "Enter your target selling price (Target Price Sale)",
      "Set your target average price (Target Avg)",
      "Click Calculate to see your investment strategy",
    ],
    example: {
      title: "Tesla Stock Investment Strategy",
      inputs: [
        { label: "Max Price", value: "$262.00" },
        { label: "Min Price", value: "$257.45" },
        { label: "Total Stock Count", value: "300 shares" },
        { label: "Number of Division", value: "10 levels" },
        { label: "Target Price Sale", value: "$280.00" },
        { label: "Target Avg", value: "$259.50" },
      ],
      result: "Strategy with 10 buy levels, weighted average ~$259.73, total investment ~$77,919",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Input Parameters
          <InfoPopup {...infoData} />
        </CardTitle>
        <CardDescription>Enter the stock parameters below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {Object.entries(inputs).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label
                  htmlFor={key}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {key === "numberOfDivision"
                    ? "Number of Division"
                    : key
                        .split(/(?=[A-Z])/)
                        .join(" ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Label>
                <Input
                  id={key}
                  name={key}
                  type="number"
                  value={value}
                  onChange={onInputChange}
                  step="any"
                  placeholder={STOCK_PLACEHOLDERS[key as keyof typeof STOCK_PLACEHOLDERS]}
                  className="placeholder:text-muted-foreground placeholder:opacity-50"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button type="submit" className="w-full sm:w-auto">
              Calculate
            </Button>
            <Button type="button" variant="outline" onClick={onReset} className="w-full sm:w-auto bg-transparent">
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
