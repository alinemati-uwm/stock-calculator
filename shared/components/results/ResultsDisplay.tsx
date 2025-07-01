import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TooltipHelper } from "../ui/tooltip-helper"

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

const resultTooltips = {
  weightedAverage:
    "The average price per share weighted by the number of shares at each price level. This is your true average cost.",
  totalShares: "Total number of shares you'll own across all price levels according to your strategy.",
  totalCostSum: "Total amount of money you'll invest to purchase all shares according to your strategy.",
  totalRevenue: "Total value of your investment if you sell all shares at the target price.",
  totalProfit: "Your profit or loss if you sell all shares at the target price (Revenue - Cost).",
  targetPriceSale: "The price per share you plan to sell at to calculate potential returns.",
  cumulativeInvestment: "Running total of money invested up to each price level.",
  averageBuyPrice: "The specific price per share at each level of your buying strategy.",
  stockCount: "Number of shares to buy at each price level.",
  percentageDifference: "How much each price level differs from your maximum price (as a percentage).",
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
            <p className="flex items-center gap-2">
              <span className="font-medium">Average of Share:</span>
              <span>${weightedAverage.toFixed(2)}</span>
              <TooltipHelper content={resultTooltips.weightedAverage} showIcon />
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">Total Number of Shares:</span>
              <span>{totalShares}</span>
              <TooltipHelper content={resultTooltips.totalShares} showIcon />
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">Total Cost Sum:</span>
              <span>${totalCostSum.toFixed(2)}</span>
              <TooltipHelper content={resultTooltips.totalCostSum} showIcon />
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">Total Cost + Profit/Loss:</span>
              <span>${totalRevenue.toFixed(2)}</span>
              <TooltipHelper content={resultTooltips.totalRevenue} showIcon />
            </p>
            {showProfitLoss && (
              <p className="flex items-center gap-2">
                <span className="font-medium">Total Profit/Loss:</span>
                <span className={totalProfit >= 0 ? "text-green-600" : "text-red-600"}>${totalProfit.toFixed(2)}</span>
                <TooltipHelper content={resultTooltips.totalProfit} showIcon />
              </p>
            )}
            <p className="flex items-center gap-2">
              <span className="font-medium">Target Price:</span>
              <span>${targetPriceSale.toFixed(2)}</span>
              <TooltipHelper content={resultTooltips.targetPriceSale} showIcon />
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
                <TableHead className="flex items-center gap-2">
                  Cumulative Investment
                  <TooltipHelper content={resultTooltips.cumulativeInvestment} showIcon />
                </TableHead>
                <TableHead className="flex items-center gap-2">
                  Average Buy Price
                  <TooltipHelper content={resultTooltips.averageBuyPrice} showIcon />
                </TableHead>
                <TableHead className="flex items-center gap-2">
                  Stock Count
                  <TooltipHelper content={resultTooltips.stockCount} showIcon />
                </TableHead>
                <TableHead className="flex items-center gap-2">
                  Percentage Difference
                  <TooltipHelper content={resultTooltips.percentageDifference} showIcon />
                </TableHead>
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
