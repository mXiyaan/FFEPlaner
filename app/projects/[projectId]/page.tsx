'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FFESidebar } from '@/components/FFESidebar'
import FFEHeader from '@/components/FFEHeader'
import { FFEDashboard } from '@/components/FFEDashboard'
import { useFFE } from '@/components/FFEContext'
import AddScheduleDialog from '@/components/AddScheduleDialog'
import { Button } from '@/components/ui/button'
import { CalendarPlus, ArrowLeft } from 'lucide-react'

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false)
  const { projects, setCurrentProjectId, addSchedule } = useFFE()
  const router = useRouter()
  
  const project = projects.find(p => p.id === params.projectId)

  useEffect(() => {
    if (params.projectId) {
      setCurrentProjectId(params.projectId)
    }
  }, [params.projectId, setCurrentProjectId])

  useEffect(() => {
    if (!project) {
      router.push('/')
    }
  }, [project, router])
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const handleAddSchedule = (name: string, budget?: number) => {
    const scheduleId = addSchedule(params.projectId, name, budget)
    setIsAddScheduleOpen(false)
    return scheduleId
  }

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
          <div className="flex flex-col items-center justify-center h-full bg-accent/5">
            <div className="text-center max-w-md p-8 rounded-lg bg-background shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Create Your First Schedule</h2>
              <p className="text-muted-foreground mb-6">
                Get started by creating a schedule to organize your furniture, fixtures, and equipment.
              </p>
              <Button onClick={() => setIsAddScheduleOpen(true)} size="lg">
                <CalendarPlus className="mr-2 h-5 w-5" />
                Create Schedule
              </Button>
            </div>
          </div>
        ) : (
          <FFEDashboard />
        )}
      </div>
      <AddScheduleDialog
        isOpen={isAddScheduleOpen}
        onClose={() => setIsAddScheduleOpen(false)}
        onAddSchedule={handleAddSchedule}
        projectId={params.projectId}
      />
    </div>
  )
}