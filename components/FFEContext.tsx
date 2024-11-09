'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Project } from '@/types/ffe'

interface FFEContextType {
  projects: Project[]
  setProjects: (projects: Project[]) => void
  currentProjectId: string
  setCurrentProjectId: (id: string) => void
  currentScheduleId: string
  setCurrentScheduleId: (id: string) => void
}

const FFEContext = createContext<FFEContextType | undefined>(undefined)

export function FFEProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'project1',
      name: 'Harmony Heights Wellness Center',
      totalBudget: 100000,
      schedules: [
        {
          id: 'schedule1',
          name: 'Interior Fixtures & Fittings',
          budget: 50000,
          items: [
            {
              id: 'CH01',
              category: 'Seating',
              name: 'Chair',
              product: 'Panton',
              productCode: 'SEA001',
              brand: 'Virta',
              dimensions: '500W x 860H x 610D',
              material: 'Polypropylene',
              finish: 'Matte',
              quantity: 2,
              leadTime: '10-12 wks',
              supplier: 'KATE STOKES',
              status: 'Pending',
              image: 'https://images.unsplash.com/photo-1503602642458-232111445657',
              price: 450,
              alternatives: []
            }
          ]
        }
      ]
    }
  ])

  const [currentProjectId, setCurrentProjectId] = useState(projects[0].id)
  const [currentScheduleId, setCurrentScheduleId] = useState(projects[0].schedules[0].id)

  return (
    <FFEContext.Provider
      value={{
        projects,
        setProjects,
        currentProjectId,
        setCurrentProjectId,
        currentScheduleId,
        setCurrentScheduleId
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