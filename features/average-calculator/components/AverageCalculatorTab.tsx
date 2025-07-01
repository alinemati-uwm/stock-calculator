"use client"

import { AverageCalculatorForm } from "./AverageCalculatorForm"
import { AverageResultsDisplay } from "./AverageResultsDisplay"
import { useAverageCalculator } from "../hooks/useAverageCalculator"

export function AverageCalculatorTab() {
  const { inputs, results, handleInputChange, handleSubmit, handleReset } = useAverageCalculator()

  return (
    <>
      <AverageCalculatorForm
        inputs={inputs}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
      {results && <AverageResultsDisplay results={results} />}
    </>
  )
}
