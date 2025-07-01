export interface ProfitResults {
  totalValue: number
  sellPrice: number
  profitPercentage: number
  profitLossAmount: number
}

export interface ProfitInputs {
  shares: string
  buyPrice: string
  sellPrice: string
  profitPercentage: string
}
