export interface StockInputs {
  maxPrice: number | string
  minPrice: number | string
  totalStockCount: number | string
  numberOfDivision: number | string
  targetPriceSale: number | string
  targetAvg: number | string
}

export interface StockResults {
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

export interface ProfitResults {
  totalValue: number
  sellPrice: number
  profitPercentage: number
  profitLossAmount: number
}

export interface PercentageResults {
  initialValue: number
  finalValue: number
  percentageChange: number
}

export interface AverageResults {
  newAverage: number
  totalShares: number
  totalCost: number
}
