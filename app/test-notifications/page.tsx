"use client"

import { Header } from "../../shared/components/layout/Header"
import { NematiFooter } from "../../shared/components/layout/NematiFooter"
import { NotificationTester } from "../../shared/components/testing/NotificationTester"

export default function TestNotificationsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      <div className="flex-1 container mx-auto p-2 sm:p-4">
        <Header title="Notification System Testing" />
        <NotificationTester />
      </div>
      <NematiFooter />
    </div>
  )
}
