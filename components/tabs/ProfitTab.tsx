import { ProfitCalculator } from "../ProfitCalculator"
import { ProfitResultsDisplay } from "../results/ProfitResultsDisplay"
import type { ProfitResults } from "../../types/calculator"

interface ProfitTabProps {
  results: ProfitResults | null
  onCalculate: (result: ProfitResults) => void
}

export function ProfitTab({ results, onCalculate }: ProfitTabProps) {
  return (
    <>
      <ProfitCalculator onCalculate={onCalculate} />
      {results && <ProfitResultsDisplay results={results} />}
    </>
  )
}
