import { Card, CardContent } from "@/components/ui/card"

interface ErrorDisplayProps {
  error: string
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <Card className="mt-4 bg-red-100 border-red-300">
      <CardContent className="pt-6">
        <p className="text-red-600">{error}</p>
      </CardContent>
    </Card>
  )
}
