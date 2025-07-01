"use client"

import type { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface TooltipHelperProps {
  content: string
  children?: ReactNode
  showIcon?: boolean
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function TooltipHelper({
  content,
  children,
  showIcon = false,
  side = "top",
  className = "",
}: TooltipHelperProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children || (
            <HelpCircle className={`h-4 w-4 text-muted-foreground hover:text-foreground cursor-help ${className}`} />
          )}
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
