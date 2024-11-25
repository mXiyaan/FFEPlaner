'use client'

import { useState, useEffect } from 'react'
import { DesignFlowSidebar } from './DesignFlowSidebar'
import { DesignFlowHeader } from './DesignFlowHeader'
import { DesignFlowContent } from './DesignFlowContent'
import { DesignFlowDialogs } from './DesignFlowDialogs'
import { useDesignFlow } from './useDesignFlow'
import { Project, Schedule, FFEItem } from '@/types/ffe'

export default function DesignFlowPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
  const {
    state,
    actions
  } = useDesignFlow()

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load data. Please try again.')
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <DesignFlowSidebar 
        isOpen={isSidebarOpen}
        projects={state.projects}
        currentProjectId={state.currentProjectId}
        currentScheduleId={state.currentScheduleId}
        onProjectSelect={actions.setCurrentProjectId}
        onScheduleSelect={actions.setCurrentScheduleId}
        onAddProject={actions.addProject}
        onAddSchedule={actions.addSchedule}
        onRenameProject={actions.renameProject}
      />

      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <DesignFlowHeader 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          currentProject={state.currentProject}
          currentSchedule={state.currentSchedule}
          viewMode={state.viewMode}
          onViewModeChange={actions.setViewMode}
          onAddCategory={() => actions.setIsAddingCategory(true)}
        />

        <DesignFlowContent 
          viewMode={state.viewMode}
          currentProject={state.currentProject}
          currentSchedule={state.currentSchedule}
          groupedItems={state.groupedItems}
          editableCategories={state.editableCategories}
          onEditCategory={actions.handleEditCategory}
          onSaveCategory={actions.handleSaveCategory}
          onDeleteCategory={actions.deleteCategory}
          onAddItem={actions.handleAddItem}
          onDeleteItem={actions.handleDeleteItem}
        />
      </div>

      <DesignFlowDialogs 
        state={state}
        actions={actions}
      />
    </div>
  )
}