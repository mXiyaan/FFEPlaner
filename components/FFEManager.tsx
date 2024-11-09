'use client'

import { useState } from 'react'
import { FFEDashboard } from '@/components/FFEDashboard'
import { FFESidebar } from '@/components/FFESidebar'
import { FFEHeader } from '@/components/FFEHeader'
import { FFEProvider } from '@/components/FFEContext'

export default function FFEManager() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <FFEProvider>
      <div className="flex h-screen bg-background">
        <FFESidebar isOpen={isSidebarOpen} />
        <div className={`flex-1 flex flex-col overflow-hidden ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <FFEHeader isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <FFEDashboard />
        </div>
      </div>
    </FFEProvider>
  )
}