'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Home, Library, Folder, File, Settings, PlusCircle, MoreVertical, Edit2, Clock, ChevronRight } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useFFE } from '@/components/FFEContext'
import NewProjectButton from './NewProjectButton'
import { Project } from '@/types/ffe'
import { Separator } from "@/components/ui/separator"

interface FFESidebarProps {
  isOpen: boolean
  currentView: string
  onViewChange: (view: string) => void
}

const ORGANIZATION_NAME = "Acme Design Studio" // This should come from user settings

export function FFESidebar({ isOpen, currentView, onViewChange }: FFESidebarProps) {
  const { 
    projects, 
    setProjects, 
    currentProjectId, 
    setCurrentProjectId, 
    currentScheduleId, 
    setCurrentScheduleId 
  } = useFFE()

  const router = useRouter()
  const pathname = usePathname()

  // Get the 5 most recent projects
  const recentProjects = [...projects]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5)

  const renameProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const newName = prompt('Enter new project name:', project.name)
    if (!newName) return

    const updatedProjects = projects.map(p =>
      p.id === projectId ? { ...p, name: newName } : p
    )
    setProjects(updatedProjects)
  }

  const handleAddProject = (newProject: Pick<Project, 'name' | 'totalBudget' | 'clientName'>) => {
    const projectId = `project${projects.length + 1}`
    const project = {
      id: projectId,
      name: newProject.name,
      clientName: newProject.clientName,
      totalBudget: newProject.totalBudget,
      schedules: [{
        id: 'schedule1',
        name: 'Default Schedule',
        budget: newProject.totalBudget,
        items: []
      }]
    }
    setProjects([...projects, project])
    setCurrentProjectId(projectId)
    setCurrentScheduleId('schedule1')
    router.push(`/projects/${projectId}`)
  }

  const addSchedule = (projectId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const newSchedule = {
          id: `schedule${project.schedules.length + 1}`,
          name: `New Schedule ${project.schedules.length + 1}`,
          budget: 0,
          items: []
        }
        return {
          ...project,
          schedules: [...project.schedules, newSchedule]
        }
      }
      return project
    })
    setProjects(updatedProjects)
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const handleProjectClick = (projectId: string, scheduleId: string) => {
    setCurrentProjectId(projectId)
    setCurrentScheduleId(scheduleId)
    router.push(`/projects/${projectId}`)
  }

  const renderProject = (project: Project) => (
    <Collapsible key={project.id}>
      <div className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-lg">
        <CollapsibleTrigger asChild>
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
            <DropdownMenuItem onClick={() => renameProject(project.id)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CollapsibleContent className="ml-4 space-y-2">
        {project.schedules.map(schedule => (
          <div
            key={schedule.id}
            onClick={() => handleProjectClick(project.id, schedule.id)}
            className="flex items-center w-full p-2 hover:bg-accent rounded-lg cursor-pointer"
          >
            <File className="mr-2 h-4 w-4" />
            <span className="text-sm">{schedule.name}</span>
          </div>
        ))}
        <div
          onClick={() => addSchedule(project.id)}
          className="flex items-center w-full p-2 hover:bg-accent rounded-lg cursor-pointer"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          <span className="text-sm">Add Schedule</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )

  return (
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
        <NewProjectButton onAddProject={handleAddProject} existingClients={[]} />
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </aside>
  )
}