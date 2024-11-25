'use client'

import { useState } from 'react'
import { Project, Schedule, FFEItem, CategoryPrefix } from '@/types/ffe'

export function useDesignFlow() {
  // State
  const [projects, setProjects] = useState<Project[]>([/* Initial projects */])
  const [currentProjectId, setCurrentProjectId] = useState<string>('')
  const [currentScheduleId, setCurrentScheduleId] = useState<string>('')
  const [viewMode, setViewMode] = useState<'summary' | 'detail'>('summary')
  const [editableCategories, setEditableCategories] = useState<Record<string, boolean>>({})
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [categoryPrefixes, setCategoryPrefixes] = useState<CategoryPrefix[]>([])
  
  // Computed values
  const currentProject = projects.find(p => p.id === currentProjectId)!
  const currentSchedule = currentProject?.schedules.find(s => s.id === currentScheduleId)!
  
  const groupedItems = currentSchedule?.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, FFEItem[]>) || {}

  // Actions
  const addProject = () => {
    const newProject: Project = {
      id: `project${projects.length + 1}`,
      name: `New Project ${projects.length + 1}`,
      totalBudget: 0,
      schedules: []
    }
    setProjects([...projects, newProject])
  }

  const renameProject = (projectId: string, newName: string) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, name: newName } : project
    ))
  }

  const addSchedule = (projectId: string) => {
    // Implementation
  }

  const handleEditCategory = (category: string) => {
    setEditableCategories(prev => ({ ...prev, [category]: true }))
  }

  const handleSaveCategory = (category: string) => {
    setEditableCategories(prev => ({ ...prev, [category]: false }))
  }

  const deleteCategory = (categoryToDelete: string) => {
    // Implementation
  }

  const handleAddItem = (category: string, existingItem?: FFEItem) => {
    // Implementation
  }

  const handleDeleteItem = (item: FFEItem) => {
    // Implementation
  }

  return {
    state: {
      projects,
      currentProjectId,
      currentScheduleId,
      currentProject,
      currentSchedule,
      viewMode,
      editableCategories,
      isAddingCategory,
      categoryPrefixes,
      groupedItems
    },
    actions: {
      setProjects,
      setCurrentProjectId,
      setCurrentScheduleId,
      setViewMode,
      setIsAddingCategory,
      addProject,
      renameProject,
      addSchedule,
      handleEditCategory,
      handleSaveCategory,
      deleteCategory,
      handleAddItem,
      handleDeleteItem
    }
  }
}