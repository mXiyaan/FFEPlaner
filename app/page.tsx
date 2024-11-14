'use client'

import { useState } from 'react'
import { FFESidebar } from '@/components/FFESidebar'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <FFESidebar 
        isOpen={isSidebarOpen}
        currentView="dashboard"
        onViewChange={() => {}}
      />
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Dashboard 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
    </div>
  )
}