"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface InfoPopupProps {
  title: string
  description: string
  howToUse: string[]
  example: {
    title: string
    inputs: { label: string; value: string }[]
    result: string
  }
}

export function InfoPopup({ title, description, howToUse, example }: InfoPopupProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="sr-only">Show information</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* How to Use */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-green-700 dark:text-green-400 flex items-center gap-2">
              📋 How to Use:
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground pl-4">
              {howToUse.map((step, index) => (
                <li key={index} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Example */}
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold text-sm mb-3 text-orange-700 dark:text-orange-400 flex items-center gap-2">
              💡 Example:
            </h4>
            <p className="text-sm font-medium mb-3">{example.title}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-foreground">Inputs:</p>
                <div className="space-y-1">
                  {example.inputs.map((input, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-1 px-2 bg-background rounded text-xs"
                    >
                      <span className="text-muted-foreground">{input.label}:</span>
                      <span className="font-mono font-medium">{input.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Result:</p>
                <div className="p-3 bg-background rounded border-l-4 border-green-500">
                  <p className="text-sm font-mono">{example.result}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
