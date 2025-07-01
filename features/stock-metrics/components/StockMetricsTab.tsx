"use client"

import { StockInputForm } from "./StockInputForm"
import { ErrorDisplay } from "./ErrorDisplay"
import ResultsDisplay from "../../../shared/components/results/ResultsDisplay"
import { StockMetricsChart } from "../../../shared/components/charts/StockMetricsChart"
import { useStockMetrics } from "../hooks/useStockMetrics"

export function StockMetricsTab() {
  const { inputs, results, error, handleInputChange, handleSubmit, handleReset } = useStockMetrics()

  return (
    <>
      <StockInputForm inputs={inputs} onInputChange={handleInputChange} onSubmit={handleSubmit} onReset={handleReset} />
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
