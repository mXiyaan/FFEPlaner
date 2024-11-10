'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Project, Schedule } from '@/types/ffe'

interface FFEContextType {
  projects: Project[]
  setProjects: (projects: Project[]) => void
  currentProjectId: string | null
  setCurrentProjectId: (id: string | null) => void
  currentScheduleId: string | null
  setCurrentScheduleId: (id: string | null) => void
  addSchedule: (projectId: string, name: string, budget?: number) => void
  updateSchedule: (projectId: string, scheduleId: string, name: string, budget?: number) => void
  deleteSchedule: (projectId: string, scheduleId: string) => void
  addProject: (project: Pick<Project, 'name' | 'totalBudget' | 'clientName'>) => string
  updateProject: (projectId: string, project: Partial<Project>) => void
  deleteProject: (projectId: string) => void
}

const FFEContext = createContext<FFEContextType | undefined>(undefined)

export function FFEProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
  const [currentScheduleId, setCurrentScheduleId] = useState<string | null>(null)

  const addProject = (projectData: Pick<Project, 'name' | 'totalBudget' | 'clientName'>) => {
    const newProject: Project = {
      id: `project${projects.length + 1}`,
      name: projectData.name,
      clientName: projectData.clientName,
      totalBudget: projectData.totalBudget,
      schedules: []
    }
    setProjects(prev => [...prev, newProject])
    setCurrentProjectId(newProject.id)
    return newProject.id
  }

  const updateProject = (projectId: string, projectData: Partial<Project>) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === projectId) {
          return { ...project, ...projectData }
        }
        return project
      })
    })
  }

  const deleteProject = (projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId))
    if (currentProjectId === projectId) {
      setCurrentProjectId(null)
      setCurrentScheduleId(null)
    }
  }

  const addSchedule = (projectId: string, name: string, budget?: number) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === projectId) {
          const newSchedule = {
            id: `schedule${project.schedules.length + 1}`,
            name,
            budget: budget || 0,
            items: []
          }
          return {
            ...project,
            schedules: [...project.schedules, newSchedule]
          }
        }
        return project
      })
    })
  }

  const updateSchedule = (projectId: string, scheduleId: string, name: string, budget?: number) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            schedules: project.schedules.map(schedule => {
              if (schedule.id === scheduleId) {
                return {
                  ...schedule,
                  name,
                  budget: budget || schedule.budget
                }
              }
              return schedule
            })
          }
        }
        return project
      })
    })
  }

  const deleteSchedule = (projectId: string, scheduleId: string) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            schedules: project.schedules.filter(schedule => schedule.id !== scheduleId)
          }
        }
        return project
      })
    })
    if (currentScheduleId === scheduleId) {
      setCurrentScheduleId(null)
    }
  }

  return (
    <FFEContext.Provider
      value={{
        projects,
        setProjects,
        currentProjectId,
        setCurrentProjectId,
        currentScheduleId,
        setCurrentScheduleId,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        addProject,
        updateProject,
        deleteProject
      }}
    >
      {children}
    </FFEContext.Provider>
  )
}

export function useFFE() {
  const context = useContext(FFEContext)
  if (context === undefined) {
    throw new Error('useFFE must be used within a FFEProvider')
  }
  return context
}