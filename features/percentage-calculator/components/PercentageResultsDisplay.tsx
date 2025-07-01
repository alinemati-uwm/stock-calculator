import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PercentageResults } from "../types"

interface PercentageResultsDisplayProps {
  results: PercentageResults
}

export function PercentageResultsDisplay({ results }: PercentageResultsDisplayProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Percentage Change Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Initial Value:</span> {results.initialValue.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Final Value:</span> {results.finalValue.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Percentage Change:</span> {results.percentageChange.toFixed(2)}%
          </p>
          {results.percentageChange < 0 ? (
            <p>
              <span className="font-medium">Result:</span>{" "}
              <span className="text-red-500">Decrease of {Math.abs(results.percentageChange).toFixed(2)}%</span>
            </p>
          ) : (
            <p>
              <span className="font-medium">Result:</span>{" "}
              <span className="text-green-500">Increase of {results.percentageChange.toFixed(2)}%</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
