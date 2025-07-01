import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AverageResults } from "../types"

interface AverageResultsDisplayProps {
  results: AverageResults
}

export function AverageResultsDisplay({ results }: AverageResultsDisplayProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Average Calculation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-medium">New Average Price:</span> ${results.newAverage.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Total Shares:</span> {results.totalShares}
          </p>
          <p>
            <span className="font-medium">Total Investment:</span> ${results.totalCost.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
