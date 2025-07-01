import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TradingViewWidget from "../../../shared/components/trading/TradingViewWidget"

export function ChartTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Stock Chart</CardTitle>
        <CardDescription>Interactive chart with technical analysis tools - Default: TESLA (TSLA)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] sm:h-[600px] w-full">
          <TradingViewWidget />
        </div>
      </CardContent>
    </Card>
  )
}
