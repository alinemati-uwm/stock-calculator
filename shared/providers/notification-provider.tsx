"use client"

import type { ReactNode } from "react"
import { createContext, useContext } from "react"
import { useNotifications } from "../hooks/useNotifications"
import { NotificationContainer } from "../components/ui/notification-system"

const NotificationContext = createContext<ReturnType<typeof useNotifications> | null>(null)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notifications = useNotifications()

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
      <NotificationContainer notifications={notifications.notifications} onRemove={notifications.removeNotification} />
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider")
  }
  return context
}
