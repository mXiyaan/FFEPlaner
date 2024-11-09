'use client'

import { useState } from 'react'
import { FFESidebar } from '@/components/FFESidebar'
import { FFEHeader } from '@/components/FFEHeader'
import { FFEDashboard } from '@/components/FFEDashboard'
import { useFFE } from '@/components/FFEContext'

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { projects, setCurrentProjectId, currentScheduleId } = useFFE()
  
  const project = projects.find(p => p.id === params.projectId)
  
  if (!project) {
    return <div>Project not found</div>
  }

  setCurrentProjectId(params.projectId)

  return (
    <div className="flex h-screen bg-background">
      <FFESidebar 
        isOpen={isSidebarOpen}
        currentView="projects"
        onViewChange={() => {}}
      />
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <FFEHeader 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <FFEDashboard />
      </div>
    </div>
  )
}