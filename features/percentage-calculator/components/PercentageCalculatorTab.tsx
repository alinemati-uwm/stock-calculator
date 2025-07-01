"use client"

import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription } from "@/components/ui/toast"
import { PercentageCalculatorForm } from "./PercentageCalculatorForm"
import { PercentageResultsDisplay } from "./PercentageResultsDisplay"
import { usePercentageCalculator } from "../hooks/usePercentageCalculator"

export function PercentageCalculatorTab() {
  const { inputs, results, showToast, handleInputChange, handleSubmit, handleReset } = usePercentageCalculator()

  return (
    <ToastProvider>
      <PercentageCalculatorForm
        inputs={inputs}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
      {results && <PercentageResultsDisplay results={results} />}
      <ToastViewport />
      {showToast && (
        <Toast>
          <ToastTitle>Form Reset</ToastTitle>
          <ToastDescription>All inputs have been cleared.</ToastDescription>
        </Toast>
      )}
    </ToastProvider>
  )
}
