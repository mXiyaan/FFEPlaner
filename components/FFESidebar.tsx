'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Home, Library, Folder, File, Settings, PlusCircle, MoreVertical, Edit2, Clock, ChevronRight } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useFFE } from '@/components/FFEContext'
import NewProjectButton from './NewProjectButton'
import AddScheduleDialog from './AddScheduleDialog'
import EditScheduleDialog from './EditScheduleDialog'
import EditProjectDialog from './EditProjectDialog'
import { Project, Schedule } from '@/types/ffe'
import { Separator } from "@/components/ui/separator"
import { cn } from '@/lib/utils'

interface FFESidebarProps {
  isOpen: boolean
  currentView: string
  onViewChange: (view: string) => void
}

const ORGANIZATION_NAME = "Acme Design Studio"

export function FFESidebar({ isOpen, currentView, onViewChange }: FFESidebarProps) {
  const { 
    projects, 
    setProjects, 
    currentProjectId, 
    setCurrentProjectId, 
    currentScheduleId, 
    setCurrentScheduleId,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    updateProject,
    deleteProject
  } = useFFE()

  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [editingSchedule, setEditingSchedule] = useState<{ projectId: string, schedule: Schedule } | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())

  const router = useRouter()
  const pathname = usePathname()

  const recentProjects = [...projects]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5)

  const handleAddScheduleClick = (projectId: string) => {
    setSelectedProjectId(projectId)
    setIsAddScheduleOpen(true)
  }

  const handleAddSchedule = (scheduleName: string, budget?: number) => {
    if (selectedProjectId) {
      const newScheduleId = addSchedule(selectedProjectId, scheduleName, budget)
      setIsAddScheduleOpen(false)
      setSelectedProjectId(null)
      // Ensure the project is expanded when a new schedule is added
      setExpandedProjects(prev => new Set([...prev, selectedProjectId]))
      // Navigate to the new schedule
      router.push(`/projects/${selectedProjectId}`)
    }
  }

  const handleEditSchedule = (projectId: string, schedule: Schedule) => {
    setEditingSchedule({ projectId, schedule })
  }

  const handleUpdateSchedule = (name: string, budget?: number) => {
    if (editingSchedule) {
      updateSchedule(editingSchedule.projectId, editingSchedule.schedule.id, name, budget)
      setEditingSchedule(null)
    }
  }

  const handleDeleteSchedule = () => {
    if (editingSchedule) {
      deleteSchedule(editingSchedule.projectId, editingSchedule.schedule.id)
      setEditingSchedule(null)
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
  }

  const handleUpdateProject = (projectData: Partial<Project>) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData)
      setEditingProject(null)
    }
  }

  const handleDeleteProject = () => {
    if (editingProject) {
      deleteProject(editingProject.id)
      setEditingProject(null)
      router.push('/')
    }
  }

  const handleProjectClick = (projectId: string, scheduleId: string) => {
    setCurrentProjectId(projectId)
    setCurrentScheduleId(scheduleId)
    router.push(`/projects/${projectId}`)
  }

  const toggleProjectExpanded = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const renderProject = (project: Project) => {
    const isExpanded = expandedProjects.has(project.id)
    const isCurrentProject = project.id === currentProjectId

    return (
      <Collapsible key={project.id} open={isExpanded}>
        <div className={cn(
          "flex items-center justify-between w-full p-2 hover:bg-accent rounded-lg",
          isCurrentProject && "bg-accent"
        )}>
          <CollapsibleTrigger asChild onClick={() => toggleProjectExpanded(project.id)}>
            <div className="flex items-center flex-grow cursor-pointer">
              <Folder className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{project.name}</span>
                {project.clientName && (
                  <span className="text-xs text-muted-foreground">{project.clientName}</span>
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleEditProject(project)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CollapsibleContent className="ml-4 space-y-2">
          {project.schedules.map(schedule => (
            <div
              key={schedule.id}
              onClick={() => handleProjectClick(project.id, schedule.id)}
              className={cn(
                "flex items-center justify-between w-full p-2 hover:bg-accent rounded-lg cursor-pointer",
                schedule.id === currentScheduleId && "bg-accent/50"
              )}
            >
              <div className="flex items-center flex-grow">
                <File className="mr-2 h-4 w-4" />
                <span className="text-sm">{schedule.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  handleEditSchedule(project.id, schedule)
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div
            onClick={() => handleAddScheduleClick(project.id)}
            className="flex items-center w-full p-2 hover:bg-accent rounded-lg cursor-pointer"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="text-sm">Add Schedule</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <>
      <aside className={`bg-muted w-64 p-4 flex flex-col fixed h-screen transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center mb-6">
          <Library className="h-8 w-8 mr-2" />
          <h2 className="text-2xl font-bold">{ORGANIZATION_NAME}</h2>
        </div>

        <nav className="flex-grow overflow-y-auto">
          <div className="space-y-2">
            <Button 
              variant={pathname === '/' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => navigateTo('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            
            <Button 
              variant={pathname === '/products' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => navigateTo('/products')}
            >
              <Library className="mr-2 h-4 w-4" />
              Products & Materials
            </Button>

            <Separator className="my-4" />
            
            <div className="space-y-1">
              <div className="flex items-center px-2 py-1.5">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Recent Projects</span>
              </div>
              {recentProjects.map(renderProject)}
              {projects.length > 5 && (
                <Button
                  variant="ghost"
                  className="w-full justify-between text-sm text-muted-foreground"
                  onClick={() => navigateTo('/')}
                >
                  View All Projects
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </nav>

        <div className="mt-auto pt-4 space-y-2">
          <NewProjectButton existingClients={[]} />
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </aside>

      {selectedProjectId && (
        <AddScheduleDialog
          isOpen={isAddScheduleOpen}
          onClose={() => {
            setIsAddScheduleOpen(false)
            setSelectedProjectId(null)
          }}
          onAddSchedule={handleAddSchedule}
          projectId={selectedProjectId}
        />
      )}

      {editingSchedule && (
        <EditScheduleDialog
          isOpen={true}
          onClose={() => setEditingSchedule(null)}
          onUpdate={handleUpdateSchedule}
          onDelete={handleDeleteSchedule}
          schedule={editingSchedule.schedule}
          projectBudgetType="Flexible Budget"
        />
      )}

      {editingProject && (
        <EditProjectDialog
          isOpen={true}
          onClose={() => setEditingProject(null)}
          onUpdate={handleUpdateProject}
          onDelete={handleDeleteProject}
          project={editingProject}
        />
      )}
    </>
  )
}