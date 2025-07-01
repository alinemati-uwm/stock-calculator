import { AverageCalculator } from "../AverageCalculator"
import { AverageResultsDisplay } from "../results/AverageResultsDisplay"
import type { AverageResults } from "../../types/calculator"

interface AverageTabProps {
  results: AverageResults | null
  onCalculate: (result: AverageResults) => void
}

export function AverageTab({ results, onCalculate }: AverageTabProps) {
  return (
    <>
      <AverageCalculator onCalculate={onCalculate} />
      {results && <AverageResultsDisplay results={results} />}
    </>
  )
}
