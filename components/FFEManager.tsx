'use client'

import { useState } from 'react'
import { FFEDashboard } from '@/components/FFEDashboard'
import { FFESidebar } from '@/components/FFESidebar'
import { FFEHeader } from '@/components/FFEHeader'
import { FFEProvider } from '@/components/FFEContext'
import Dashboard from '@/components/Dashboard'

export default function FFEManager() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState<'dashboard' | 'projects'>('dashboard')

  const mockProjects = [
    {
      id: '1',
      name: 'Harmony Heights Wellness Center',
      budget: 100000,
      client: { name: 'Wellness Corp' },
      teamMembers: ['John Doe', 'Jane Smith', 'Mike Johnson']
    },
    {
      id: '2',
      name: 'Urban Living Apartments',
      budget: 250000,
      client: { name: 'City Development LLC' },
      teamMembers: ['Sarah Wilson', 'Tom Brown']
    },
    {
      id: '3',
      name: 'Sunset Restaurant Renovation',
      budget: 75000,
      client: { name: 'Fine Dining Group' },
      teamMembers: ['Alex Chen', 'Maria Garcia', 'David Kim']
    }
  ]

  return (
    <FFEProvider>
      <div className="flex h-screen bg-background">
        <FFESidebar 
          isOpen={isSidebarOpen} 
          onViewChange={setCurrentView}
          currentView={currentView}
        />
        <div className={`flex-1 flex flex-col overflow-hidden ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {currentView === 'dashboard' ? (
            <Dashboard 
              projects={mockProjects}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          ) : (
            <>
              <FFEHeader 
                isSidebarOpen={isSidebarOpen} 
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
              />
              <FFEDashboard />
            </>
          )}
        </div>
      </div>
    </FFEProvider>
  )
}