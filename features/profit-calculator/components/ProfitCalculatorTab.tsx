"use client"

import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription } from "@/components/ui/toast"
import { ProfitCalculatorForm } from "./ProfitCalculatorForm"
import { ProfitResultsDisplay } from "./ProfitResultsDisplay"
import { useProfitCalculator } from "../hooks/useProfitCalculator"

export function ProfitCalculatorTab() {
  const { inputs, results, showToast, handleInputChange, handleSubmit, handleReset } = useProfitCalculator()

  return (
    <ToastProvider>
      <ProfitCalculatorForm
        inputs={inputs}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
      {results && <ProfitResultsDisplay results={results} />}
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
