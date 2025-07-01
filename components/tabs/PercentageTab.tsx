import { PercentageCalculator } from "../PercentageCalculator"
import { PercentageResultsDisplay } from "../results/PercentageResultsDisplay"
import type { PercentageResults } from "../../types/calculator"

interface PercentageTabProps {
  results: PercentageResults | null
  onCalculate: (result: PercentageResults) => void
}

export function PercentageTab({ results, onCalculate }: PercentageTabProps) {
  return (
    <>
      <PercentageCalculator onCalculate={onCalculate} />
      {results && <PercentageResultsDisplay results={results} />}
    </>
  )
}
