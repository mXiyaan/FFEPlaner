'use client'

import { useState } from 'react'
import { useFFE } from '@/components/FFEContext'
import { FFECategoryList } from '@/components/FFECategoryList'
import { FFEBudgetSummary } from '@/components/FFEBudgetSummary'

export function FFEDashboard() {
  const [viewMode, setViewMode] = useState<'summary' | 'detail'>('summary')
  const [searchTerm, setSearchTerm] = useState('')
  const [listViewMode, setListViewMode] = useState<'list' | 'grid'>('list')

  const { projects, currentProjectId, currentScheduleId } = useFFE()
  const currentProject = projects.find(p => p.id === currentProjectId)
  const currentSchedule = currentProject?.schedules.find(s => s.id === currentScheduleId)

  if (!currentProject || !currentSchedule) {
    return <div className="p-4">No project or schedule selected</div>
  }

  return (
    <main className="flex-1 overflow-x-auto p-4">
      <FFEBudgetSummary project={currentProject} schedule={currentSchedule} />
      
      {viewMode === 'summary' ? (
        <FFECategoryList
          schedule={currentSchedule}
          searchTerm={searchTerm}
          viewMode={listViewMode}
        />
      ) : (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Detail View</h2>
          <p>Detail view content will be implemented in the future.</p>
        </div>
      )}
    </main>
  )
}