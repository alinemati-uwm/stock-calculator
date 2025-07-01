"use client"

import { ProfitCalculatorForm } from "./ProfitCalculatorForm"
import { ProfitResultsDisplay } from "./ProfitResultsDisplay"
import { useProfitCalculator } from "../hooks/useProfitCalculator"

export function ProfitCalculatorTab() {
  const { inputs, results, isCalculating, handleInputChange, handleSubmit, handleReset } = useProfitCalculator()

  return (
    <>
      <ProfitCalculatorForm
        inputs={inputs}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        isCalculating={isCalculating}
      />
      {results && <ProfitResultsDisplay results={results} />}
    </>
  )
}
