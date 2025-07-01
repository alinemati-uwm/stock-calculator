"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNotificationContext } from "../../providers/notification-provider"

export function NotificationTester() {
  const { success, error, info, warning, validationError, calculationSuccess, formReset } = useNotificationContext()

  const testOverlapping = () => {
    // Trigger multiple notifications rapidly to test overlapping
    success("Test Success 1", "This is the first success notification")
    setTimeout(() => error("Test Error 1", "This is the first error notification"), 100)
    setTimeout(() => warning("Test Warning 1", "This is the first warning notification"), 200)
    setTimeout(() => info("Test Info 1", "This is the first info notification"), 300)
    setTimeout(() => success("Test Success 2", "This is the second success notification"), 400)
  }

  const testValidationMessages = () => {
    validationError("Please fill in all fields before calculating.")
    setTimeout(() => validationError("Please fill in the Max Price field before calculating."), 1000)
    setTimeout(() => validationError("Please fill in the Max Price and Min Price fields before calculating."), 2000)
  }

  const testAllNotificationTypes = () => {
    success("Calculation Complete", "Strategy created with 300 shares, weighted average $259.73")
    setTimeout(() => error("Validation Error", "Max price must be greater than min price."), 500)
    setTimeout(
      () => warning("High Division Count", "Using more than 50 divisions may result in very small position sizes."),
      1000,
    )
    setTimeout(
      () => info("Purchase Below Average", "You're buying below your current average - good dollar-cost averaging!"),
      1500,
    )
    setTimeout(() => calculationSuccess("Stock Metrics Calculation", "Strategy with detailed results"), 2000)
    setTimeout(() => formReset(), 2500)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>🧪 Notification System Tester</CardTitle>
        <CardDescription>Test all notification features and behaviors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={testOverlapping} variant="outline" className="w-full bg-transparent">
            🔄 Test Overlapping (5 rapid notifications)
          </Button>

          <Button onClick={testValidationMessages} variant="outline" className="w-full bg-transparent">
            ❌ Test Validation Messages
          </Button>

          <Button onClick={testAllNotificationTypes} variant="outline" className="w-full bg-transparent">
            🎨 Test All Notification Types
          </Button>

          <Button onClick={() => validationError()} variant="outline" className="w-full">
            📝 Test Default Validation Message
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
          <Button
            onClick={() => success("Success!", "Operation completed successfully")}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            ✅ Success
          </Button>

          <Button onClick={() => error("Error!", "Something went wrong")} size="sm" variant="destructive">
            ❌ Error
          </Button>

          <Button
            onClick={() => warning("Warning!", "Please check your inputs")}
            size="sm"
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            ⚠️ Warning
          </Button>

          <Button
            onClick={() => info("Info!", "Here's some helpful information")}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            ℹ️ Info
          </Button>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">✅ Verification Checklist:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Notifications appear in lower-right corner</li>
            <li>• Multiple notifications stack properly without blocking</li>
            <li>• Validation message: "Please fill in all fields before calculating."</li>
            <li>• All notification types (success, error, warning, info) work</li>
            <li>• Loading states prevent multiple submissions</li>
            <li>• Modular system prevents code duplication</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
