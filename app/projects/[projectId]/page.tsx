'use client'

import { useState } from 'react'
import { FFESidebar } from '@/components/FFESidebar'
import { FFEHeader } from '@/components/FFEHeader'
import { FFEDashboard } from '@/components/FFEDashboard'
import { useFFE } from '@/components/FFEContext'
import AddScheduleDialog from '@/components/AddScheduleDialog'
import { Button } from '@/components/ui/button'
import { CalendarPlus } from 'lucide-react'

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false)
  const { projects, setCurrentProjectId, currentScheduleId, addSchedule } = useFFE()
  
  const project = projects.find(p => p.id === params.projectId)
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleAddSchedule = (name: string, budget?: number) => {
    addSchedule(params.projectId, name, budget)
    setIsAddScheduleOpen(false)
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
        {project.schedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">No Schedules</h2>
            <p className="text-muted-foreground mb-6">This project doesn't have any schedules yet.</p>
            <Button onClick={() => setIsAddScheduleOpen(true)}>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Create First Schedule
            </Button>
          </div>
        ) : (
          <FFEDashboard />
        )}
      </div>
      <AddScheduleDialog
        isOpen={isAddScheduleOpen}
        onClose={() => setIsAddScheduleOpen(false)}
        onAddSchedule={handleAddSchedule}
        projectBudgetType="Flexible Budget"
      />
    </div>
  )
}