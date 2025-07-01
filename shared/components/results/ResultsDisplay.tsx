import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ResultsDisplayProps {
  results: {
    aveBuyPrice: number[]
    stockCount: number[]
    percentageDifference: number[]
    investmentMoney: number[]
    weightedAverage: number
    totalShares: number
    totalCostSum: number
    totalRevenue: number
    targetPriceSale: number
    totalProfit: number
  }
  showProfitLoss?: boolean
}

export default function ResultsDisplay({ results, showProfitLoss = false }: ResultsDisplayProps) {
  const {
    aveBuyPrice,
    stockCount,
    percentageDifference,
    investmentMoney,
    weightedAverage,
    totalShares,
    totalCostSum,
    totalRevenue,
    targetPriceSale,
    totalProfit,
  } = results

  return (
    <div className="mt-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Results Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Average of Share:</span> ${weightedAverage.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Total Number of Shares:</span> {totalShares}
            </p>
            <p>
              <span className="font-medium">Total Cost Sum:</span> ${totalCostSum.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Total Cost + Profit/Loss:</span> ${totalRevenue.toFixed(2)}
            </p>
            {showProfitLoss && (
              <p>
                <span className="font-medium">Total Profit/Loss:</span> ${totalProfit.toFixed(2)}
              </p>
            )}
            <p>
              <span className="font-medium">Target Price:</span> ${targetPriceSale.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average of Share and Stock Count</CardTitle>
          <CardDescription>Sorted by Average Buy Price (descending)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cumulative Investment</TableHead>
                <TableHead>Average Buy Price</TableHead>
                <TableHead>Stock Count</TableHead>
                <TableHead>Percentage Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aveBuyPrice
                .map((price, index) => (
                  <TableRow key={index}>
                    <TableCell>${investmentMoney[index].toFixed(2)}</TableCell>
                    <TableCell>${price.toFixed(2)}</TableCell>
                    <TableCell>{stockCount[index]}</TableCell>
                    <TableCell>{percentageDifference[index].toFixed(2)}%</TableCell>
                  </TableRow>
                ))
                .sort(
                  (a, b) =>
                    Number.parseFloat(b.props.children[1].props.children[1]) -
                    Number.parseFloat(a.props.children[1].props.children[1]),
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
