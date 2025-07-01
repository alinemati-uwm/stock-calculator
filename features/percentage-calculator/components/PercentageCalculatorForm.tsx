"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoPopup } from "../../../shared/components/ui/info-popup"
import type { PercentageInputs } from "../types"

interface PercentageCalculatorFormProps {
  inputs: PercentageInputs
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
}

export function PercentageCalculatorForm({ inputs, onInputChange, onSubmit, onReset }: PercentageCalculatorFormProps) {
  const infoData = {
    title: "Percentage Change Calculator",
    description:
      "Calculate the percentage increase or decrease between two values - perfect for analyzing stock price movements",
    howToUse: [
      "Enter the starting value (Initial Value) - this could be a stock price, portfolio value, etc.",
      "Enter the ending value (Final Value) - the current or target price",
      "Click Calculate to see the percentage change",
      "Positive percentages indicate growth, negative percentages indicate decline",
    ],
    example: {
      title: "Stock Price Movement Analysis",
      inputs: [
        { label: "Initial Value", value: "$100.00 (starting stock price)" },
        { label: "Final Value", value: "$85.00 (current stock price)" },
      ],
      result: "Percentage Change: -15% (15% decrease from original price)",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Percentage Change Calculator
          <InfoPopup {...infoData} />
        </CardTitle>
        <CardDescription>Calculate the percentage change between two values</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="initialValue">Initial Value</Label>
            <Input
              id="initialValue"
              name="initialValue"
              type="number"
              value={inputs.initialValue}
              onChange={onInputChange}
              placeholder="Enter initial value (e.g., 100)"
              className="placeholder:text-muted-foreground placeholder:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="finalValue">Final Value</Label>
            <Input
              id="finalValue"
              name="finalValue"
              type="number"
              value={inputs.finalValue}
              onChange={onInputChange}
              step="0.01"
              placeholder="Enter final value (e.g., 85)"
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
