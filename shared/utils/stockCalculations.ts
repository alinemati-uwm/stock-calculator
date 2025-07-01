import { linspace, roundToDecimal } from "./mathUtils"

interface StockInputs {
  maxPrice: number | string
  minPrice: number | string
  totalStockCount: number | string
  numberOfDivision: number | string
  targetPriceSale: number | string
  targetAvg: number | string
}

export function calculateStockMetrics(inputs: StockInputs) {
  const maxPrice = Number(inputs.maxPrice)
  const minPrice = Number(inputs.minPrice)
  const totalStockCount = Number(inputs.totalStockCount)
  const numberOfDivision = Number(inputs.numberOfDivision)
  const targetPriceSale = Number(inputs.targetPriceSale)

  if (maxPrice <= 0 || minPrice <= 0 || totalStockCount <= 0 || numberOfDivision <= 0 || targetPriceSale <= 0) {
    throw new Error("All input values must be positive numbers")
  }

  if (maxPrice < minPrice) {
    throw new Error("Max price must be greater than or equal to min price")
  }

  const aveBuyPrice = linspace(maxPrice, minPrice, numberOfDivision)
  let stockCount = linspace(2, 44, numberOfDivision).map(Math.round)

  // Normalize stock_count to ensure it sums to total_stock_count
  const sum = stockCount.reduce((a, b) => a + b, 0)
  stockCount = stockCount.map((count) => Math.round((count / sum) * totalStockCount))

  // Adjust to ensure the total stock count matches exactly
  stockCount[stockCount.length - 1] += totalStockCount - stockCount.reduce((a, b) => a + b, 0)

  // Calculate cumulative investment money for each division
  const investmentMoney = aveBuyPrice.map((price, index) => {
    const currentInvestment = roundToDecimal(price * stockCount[index], 2)
    const previousInvestments = investmentMoney.slice(0, index).reduce((sum, inv) => sum + inv, 0)
    return roundToDecimal(currentInvestment + previousInvestments, 2)
  })

  // Calculating the weighted average
  const totalShares = stockCount.reduce((a, b) => a + b, 0)
  const totalCost = aveBuyPrice.reduce((sum, price, i) => sum + price * stockCount[i], 0)
  const weightedAverage = roundToDecimal(totalCost / totalShares, 2)

  // Calculating the total cost and revenue
  const totalRevenue = roundToDecimal(totalShares * targetPriceSale, 2)
  const totalCostSum = roundToDecimal(totalCost, 2)
  const totalProfit = roundToDecimal(totalRevenue - totalCostSum, 2)

  const percentageDifference = aveBuyPrice.map((price) =>
    roundToDecimal(calculatePercentageDifference(price, maxPrice), 2),
  )

  return {
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
  }
}

function calculatePercentageDifference(current: number, max: number): number {
  if (max === 0) throw new Error("Cannot calculate percentage difference when max is zero")
  return ((max - current) / max) * 100
}
