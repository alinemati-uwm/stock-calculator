import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProfitResults } from "../types"

interface ProfitResultsDisplayProps {
  results: ProfitResults
}

export function ProfitResultsDisplay({ results }: ProfitResultsDisplayProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Profit Calculation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Total Value:</span> ${results.totalValue.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Sell Price:</span> ${results.sellPrice.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Profit Percentage:</span> {results.profitPercentage.toFixed(2)}%
          </p>
          <p>
            <span className="font-medium">{results.profitLossAmount >= 0 ? "Profit" : "Loss"} Amount:</span>{" "}
            <span className={results.profitLossAmount >= 0 ? "text-green-600" : "text-red-600"}>
              ${Math.abs(results.profitLossAmount).toFixed(2)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
