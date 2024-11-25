'use client'

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Home, Library, Settings, PlusCircle, MoreVertical, Edit2, Folder, File } from 'lucide-react'
import { Project } from '@/types/ffe'

interface DesignFlowSidebarProps {
  isOpen: boolean
  projects: Project[]
  currentProjectId: string
  currentScheduleId: string
  onProjectSelect: (id: string) => void
  onScheduleSelect: (id: string) => void
  onAddProject: () => void
  onAddSchedule: (projectId: string) => void
  onRenameProject: (projectId: string, newName: string) => void
}

export function DesignFlowSidebar({
  isOpen,
  projects,
  currentProjectId,
  currentScheduleId,
  onProjectSelect,
  onScheduleSelect,
  onAddProject,
  onAddSchedule,
  onRenameProject
}: DesignFlowSidebarProps) {
  return (
    <aside className={`bg-muted w-64 p-4 flex flex-col fixed h-screen transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center mb-6">
        <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 mr-2" />
        <h2 className="text-2xl font-bold">Innovate Interiors</h2>
      </div>

      <nav className="flex-grow overflow-y-auto">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          
          <Button variant="ghost" className="w-full justify-start">
            <Library className="mr-2 h-4 w-4" />
            Products & Materials
          </Button>

          {projects.map(project => (
            <ProjectItem
              key={project.id}
              project={project}
              isActive={project.id === currentProjectId}
              currentScheduleId={currentScheduleId}
              onProjectSelect={onProjectSelect}
              onScheduleSelect={onScheduleSelect}
              onAddSchedule={onAddSchedule}
              onRenameProject={onRenameProject}
            />
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-4 space-y-2">
        <Button variant="outline" className="w-full justify-start" onClick={onAddProject}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
        
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </aside>
  )
}

interface ProjectItemProps {
  project: Project
  isActive: boolean
  currentScheduleId: string
  onProjectSelect: (id: string) => void
  onScheduleSelect: (id: string) => void
  onAddSchedule: (projectId: string) => void
  onRenameProject: (projectId: string, newName: string) => void
}

function ProjectItem({
  project,
  isActive,
  currentScheduleId,
  onProjectSelect,
  onScheduleSelect,
  onAddSchedule,
  onRenameProject
}: ProjectItemProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-lg">
        <div className="flex items-center">
          <Folder className="mr-2 h-4 w-4" />
          <span>{project.name}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => {
              const newName = prompt("Enter new project name", project.name)
              if (newName) onRenameProject(project.id, newName)
            }}>
              <Edit2 className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="ml-4 space-y-2">
        {project.schedules.map(schedule => (
          <Button
            key={schedule.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              onProjectSelect(project.id)
              onScheduleSelect(schedule.id)
            }}
          >
            <File className="mr-2 h-4 w-4" />
            {schedule.name}
          </Button>
        ))}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start"
          onClick={() => onAddSchedule(project.id)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </CollapsibleContent>
    </Collapsible>
  )
}