import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface StockMetricsChartProps {
  data: {
    aveBuyPrice: number[]
    stockCount: number[]
  }
}

export function StockMetricsChart({ data }: StockMetricsChartProps) {
  const chartData = data.aveBuyPrice.map((price, index) => ({
    price: price.toFixed(2),
    count: data.stockCount[index],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Distribution</CardTitle>
        <CardDescription>Average buy price vs. Stock count</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "Average Buy Price",
              color: "hsl(var(--chart-1))",
            },
            count: {
              label: "Stock Count",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="price" />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
              <Bar dataKey="price" yAxisId="left" fill="hsl(var(--chart-1))" />
              <Bar dataKey="count" yAxisId="right" fill="hsl(var(--chart-2))" />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
