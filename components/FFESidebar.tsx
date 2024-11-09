'use client'

import { useFFE } from '@/components/FFEContext'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Home, Library, Folder, File, Settings, PlusCircle, MoreVertical, Edit2 } from 'lucide-react'
import Link from 'next/link'

interface FFESidebarProps {
  isOpen: boolean
}

export function FFESidebar({ isOpen }: FFESidebarProps) {
  const { 
    projects, 
    setProjects, 
    currentProjectId, 
    setCurrentProjectId, 
    currentScheduleId, 
    setCurrentScheduleId 
  } = useFFE()

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

  const addProject = () => {
    const newProject = {
      id: `project${projects.length + 1}`,
      name: `New Project ${projects.length + 1}`,
      totalBudget: 0,
      schedules: []
    }
    setProjects([...projects, newProject])
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

  return (
    <aside className={`bg-muted w-64 p-4 flex flex-col fixed h-screen transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center mb-6">
        <Library className="h-8 w-8 mr-2" />
        <h2 className="text-2xl font-bold">Innovate Interiors</h2>
      </div>

      <nav className="flex-grow overflow-y-auto">
        <div className="space-y-2">
          <Link href="/dashboard" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          
          <Link href="/products" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <Library className="mr-2 h-4 w-4" />
              Products & Materials
            </Button>
          </Link>

          {projects.map(project => (
            <Collapsible key={project.id}>
              <div className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-lg">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center flex-grow cursor-pointer">
                    <Folder className="mr-2 h-4 w-4" />
                    <span>{project.name}</span>
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
                    onClick={() => {
                      setCurrentProjectId(project.id)
                      setCurrentScheduleId(schedule.id)
                    }}
                    className="flex items-center w-full p-2 hover:bg-accent rounded-lg cursor-pointer"
                  >
                    <File className="mr-2 h-4 w-4" />
                    <span>{schedule.name}</span>
                  </div>
                ))}
                <div
                  onClick={() => addSchedule(project.id)}
                  className="flex items-center w-full p-2 hover:bg-accent rounded-lg cursor-pointer"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Add Schedule</span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-4 space-y-2">
        <Button variant="outline" className="w-full justify-start" onClick={addProject}>
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