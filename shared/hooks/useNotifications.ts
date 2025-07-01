"use client"

import { useState, useCallback } from "react"
import type { Notification, NotificationType } from "../components/ui/notification-system"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback(
    (
      type: NotificationType,
      title: string,
      message: string,
      options?: {
        duration?: number
        action?: {
          label: string
          onClick: () => void
        }
      },
    ) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const notification: Notification = {
        id,
        type,
        title,
        message,
        duration: options?.duration ?? 5000,
        action: options?.action,
      }

      setNotifications((prev) => [notification, ...prev])
      return id
    },
    [],
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  // Convenience methods with consistent messaging
  const success = useCallback(
    (title: string, message: string, options?: { duration?: number }) =>
      addNotification("success", title, message, options),
    [addNotification],
  )

  const error = useCallback(
    (title: string, message: string, options?: { duration?: number }) =>
      addNotification("error", title, message, { duration: 7000, ...options }),
    [addNotification],
  )

  const info = useCallback(
    (title: string, message: string, options?: { duration?: number }) =>
      addNotification("info", title, message, options),
    [addNotification],
  )

  const warning = useCallback(
    (title: string, message: string, options?: { duration?: number }) =>
      addNotification("warning", title, message, { duration: 6000, ...options }),
    [addNotification],
  )

  // Specific validation error for consistency
  const validationError = useCallback(
    (customMessage?: string) => {
      const message = customMessage || "Please fill in all fields before calculating."
      return addNotification("error", "Validation Error", message, { duration: 7000 })
    },
    [addNotification],
  )

  // Calculation success with results summary
  const calculationSuccess = useCallback(
    (calculationType: string, summary: string) => {
      return addNotification("success", `${calculationType} Complete`, summary, { duration: 6000 })
    },
    [addNotification],
  )

  // Form reset confirmation
  const formReset = useCallback(() => {
    return addNotification("info", "Form Reset", "All inputs have been cleared.", { duration: 3000 })
  }, [addNotification])

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    info,
    warning,
    validationError,
    calculationSuccess,
    formReset,
  }
}
