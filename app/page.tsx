"use client"

import { useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "../shared/components/layout/Header"
import { NematiFooter } from "../shared/components/layout/NematiFooter"
import { StockMetricsTab } from "../features/stock-metrics/components/StockMetricsTab"
import { ProfitCalculatorTab } from "../features/profit-calculator/components/ProfitCalculatorTab"
import { PercentageCalculatorTab } from "../features/percentage-calculator/components/PercentageCalculatorTab"
import { AverageCalculatorTab } from "../features/average-calculator/components/AverageCalculatorTab"
import { ChartTab } from "../features/chart/components/ChartTab"
import TradingViewTicker from "../shared/components/trading/TradingViewTicker"

export default function StockCalculator() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("Service Worker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("Service Worker registration failed: ", err)
          },
        )
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      {/* Header with Ticker */}
      <div className="w-full border-b bg-card">
        <TradingViewTicker />
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-2 sm:p-4">
        <Header title="Stock Metrics" />

        <div className="w-full overflow-x-auto">
          <Tabs defaultValue="metrics" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-5 md:grid-cols-3 sm:flex sm:w-max sm:overflow-x-auto sm:space-x-1">
              <TabsTrigger value="metrics" className="whitespace-nowrap">
                Stock Metrics
              </TabsTrigger>
              <TabsTrigger value="profit" className="whitespace-nowrap">
                Profit Calc
              </TabsTrigger>
              <TabsTrigger value="percentage" className="whitespace-nowrap">
                % Change
              </TabsTrigger>
              <TabsTrigger value="average" className="whitespace-nowrap">
                Average
              </TabsTrigger>
              <TabsTrigger value="chart" className="whitespace-nowrap">
                Chart
              </TabsTrigger>
            </TabsList>

            <TabsContent value="metrics">
              <StockMetricsTab />
            </TabsContent>

            <TabsContent value="profit">
              <ProfitCalculatorTab />
            </TabsContent>

            <TabsContent value="percentage">
              <PercentageCalculatorTab />
            </TabsContent>

            <TabsContent value="average">
              <AverageCalculatorTab />
            </TabsContent>

            <TabsContent value="chart">
              <ChartTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <NematiFooter />
    </div>
  )
}
