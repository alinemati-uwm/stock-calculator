"use client"

import type React from "react"

import { StockInputForm } from "../forms/StockInputForm"
import { ErrorDisplay } from "../results/ErrorDisplay"
import ResultsDisplay from "../ResultsDisplay"
import { StockMetricsChart } from "../StockMetricsChart"
import type { StockInputs, StockResults } from "../../types/calculator"

interface StockMetricsTabProps {
  inputs: StockInputs
  results: StockResults | null
  error: string | null
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
}

export function StockMetricsTab({ inputs, results, error, onInputChange, onSubmit, onReset }: StockMetricsTabProps) {
  return (
    <>
      <StockInputForm inputs={inputs} onInputChange={onInputChange} onSubmit={onSubmit} onReset={onReset} />
      {error && <ErrorDisplay error={error} />}
      {results && (
        <>
          <ResultsDisplay results={results} showProfitLoss={true} />
          <StockMetricsChart data={results} />
        </>
      )}
    </>
  )
}
