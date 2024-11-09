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
          projects={[
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
          ]}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
    </div>
  )
}