"use client"

import { PercentageCalculatorForm } from "./PercentageCalculatorForm"
import { PercentageResultsDisplay } from "./PercentageResultsDisplay"
import { usePercentageCalculator } from "../hooks/usePercentageCalculator"

export function PercentageCalculatorTab() {
  const { inputs, results, isCalculating, handleInputChange, handleSubmit, handleReset } = usePercentageCalculator()

  return (
    <>
      <PercentageCalculatorForm
        inputs={inputs}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        isCalculating={isCalculating}
      />
      {results && <PercentageResultsDisplay results={results} />}
    </>
  )
}
