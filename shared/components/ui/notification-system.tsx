"use client"

import { useEffect } from "react"
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export type NotificationType = "success" | "error" | "info" | "warning"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationItemProps {
  notification: Notification
  onRemove: (id: string) => void
  index: number
}

function NotificationItem({ notification, onRemove, index }: NotificationItemProps) {
  const { id, type, title, message, duration = 5000, action } = notification

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onRemove])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-l-green-500"
      case "error":
        return "border-l-red-500"
      case "warning":
        return "border-l-yellow-500"
      case "info":
      default:
        return "border-l-blue-500"
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950/20"
      case "error":
        return "bg-red-50 dark:bg-red-950/20"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950/20"
      case "info":
      default:
        return "bg-blue-50 dark:bg-blue-950/20"
    }
  }

  return (
    <Card
      className={`p-4 shadow-lg border-l-4 ${getBorderColor()} ${getBackgroundColor()} animate-in slide-in-from-right duration-300`}
      style={{
        zIndex: 1000 - index,
      }}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{message}</p>
          {action && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2 h-7 text-xs bg-transparent"
              onClick={() => {
                action.onClick()
                onRemove(id)
              }}
            >
              {action.label}
            </Button>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-muted/50 shrink-0"
          onClick={() => onRemove(id)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close notification</span>
        </Button>
      </div>
    </Card>
  )
}

interface NotificationContainerProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col-reverse gap-0 max-w-sm w-full pointer-events-none">
      <div className="pointer-events-auto space-y-2">
        {notifications.map((notification, index) => (
          <NotificationItem key={notification.id} notification={notification} onRemove={onRemove} index={index} />
        ))}
      </div>
    </div>
  )
}
