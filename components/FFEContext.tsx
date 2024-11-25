'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Project, Schedule, Category, FFEItem } from '@/types/ffe'
import { Product } from '@/types/product'
import { v4 as uuidv4 } from 'uuid'

export type PDFTheme = 'modern' | 'classic' | 'minimal'

export type PDFColumnVisibility = {
  image: boolean
  productCode: boolean
  name: boolean
  product: boolean
  brand: boolean
  dimensions: boolean
  material: boolean
  finish: boolean
  quantity: boolean
  unitPrice: boolean
  totalPrice: boolean
  leadTime: boolean
  supplier: boolean
  status: boolean
}

interface FFEContextType {
  projects: Project[]
  setProjects: (projects: Project[]) => void
  currentProjectId: string | null
  setCurrentProjectId: (id: string | null) => void
  currentScheduleId: string | null
  setCurrentScheduleId: (id: string | null) => void
  addSchedule: (projectId: string, name: string, budget?: number) => string
  updateSchedule: (projectId: string, scheduleId: string, name: string, budget?: number) => void
  deleteSchedule: (projectId: string, scheduleId: string) => void
  addProject: (project: Pick<Project, 'name' | 'totalBudget' | 'clientName'>) => string
  updateProject: (projectId: string, project: Partial<Project>) => void
  deleteProject: (projectId: string) => void
  addCategory: (projectId: string, name: string, prefix: string) => void
  getCategories: (projectId: string) => Category[]
  addFFEItem: (projectId: string, scheduleId: string, categoryId: string, product: Product, quantity: number) => void
  updateFFEItem: (projectId: string, scheduleId: string, itemId: string, updates: Partial<FFEItem>) => void
  deleteFFEItem: (projectId: string, scheduleId: string, itemId: string) => void
  pdfTheme: PDFTheme
  setPDFTheme: (theme: PDFTheme) => void
  pdfColumnVisibility: PDFColumnVisibility
  setPDFColumnVisibility: (visibility: PDFColumnVisibility) => void
}

const defaultColumnVisibility: PDFColumnVisibility = {
  image: true,
  productCode: true,
  name: true,
  product: true,
  brand: true,
  dimensions: true,
  material: true,
  finish: true,
  quantity: true,
  unitPrice: true,
  totalPrice: true,
  leadTime: true,
  supplier: true,
  status: true
}

const FFEContext = createContext<FFEContextType | undefined>(undefined)

export function FFEProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
  const [currentScheduleId, setCurrentScheduleId] = useState<string | null>(null)
  const [pdfTheme, setPDFTheme] = useState<PDFTheme>('modern')
  const [pdfColumnVisibility, setPDFColumnVisibility] = useState<PDFColumnVisibility>(defaultColumnVisibility)

  const generateId = () => uuidv4()

  const addProject = (projectData: Pick<Project, 'name' | 'totalBudget' | 'clientName'>) => {
    const newProject: Project = {
      id: generateId(),
      name: projectData.name,
      clientName: projectData.clientName,
      totalBudget: projectData.totalBudget,
      schedules: [],
      categories: []
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
    const scheduleId = generateId()
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === projectId) {
          const newSchedule = {
            id: scheduleId,
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
    setCurrentScheduleId(scheduleId)
    return scheduleId
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

  const addCategory = (projectId: string, name: string, prefix: string) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === projectId) {
          const newCategory: Category = {
            id: generateId(),
            name,
            prefix: prefix.toUpperCase()
          }
          return {
            ...project,
            categories: [...project.categories, newCategory]
          }
        }
        return project
      })
    })
  }

  const getCategories = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    return project?.categories || []
  }

  const addFFEItem = (projectId: string, scheduleId: string, categoryId: string, product: Product, quantity: number) => {
    const project = projects.find(p => p.id === projectId)
    const category = project?.categories.find(c => c.id === categoryId)

    if (!project || !category) return

    const newItem: FFEItem = {
      id: generateId(),
      category: category.name,
      name: product.name,
      product: product.name,
      productCode: `${category.prefix}-${generateId().substring(0, 6).toUpperCase()}`,
      brand: product.brand,
      dimensions: product.specifications.dimensions,
      material: product.specifications.material,
      finish: '',
      quantity,
      leadTime: '4-6 weeks',
      supplier: '',
      status: 'Pending',
      image: product.image,
      price: product.price,
      alternatives: []
    }

    setProjects(prevProjects => {
      return prevProjects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            schedules: p.schedules.map(s => {
              if (s.id === scheduleId) {
                return {
                  ...s,
                  items: [...s.items, newItem]
                }
              }
              return s
            })
          }
        }
        return p
      })
    })
  }

  const updateFFEItem = (projectId: string, scheduleId: string, itemId: string, updates: Partial<FFEItem>) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            schedules: project.schedules.map(schedule => {
              if (schedule.id === scheduleId) {
                return {
                  ...schedule,
                  items: schedule.items.map(item => {
                    if (item.id === itemId) {
                      return { ...item, ...updates }
                    }
                    return item
                  })
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

  const deleteFFEItem = (projectId: string, scheduleId: string, itemId: string) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            schedules: project.schedules.map(schedule => {
              if (schedule.id === scheduleId) {
                return {
                  ...schedule,
                  items: schedule.items.filter(item => item.id !== itemId)
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
        deleteProject,
        addCategory,
        getCategories,
        addFFEItem,
        updateFFEItem,
        deleteFFEItem,
        pdfTheme,
        setPDFTheme,
        pdfColumnVisibility,
        setPDFColumnVisibility
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