"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { StockInputs } from "../../types/calculator"
import { STOCK_PLACEHOLDERS } from "../../constants/placeholders"

interface StockInputFormProps {
  inputs: StockInputs
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
}

export function StockInputForm({ inputs, onInputChange, onSubmit, onReset }: StockInputFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Parameters</CardTitle>
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
