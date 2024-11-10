'use client'

import { useFFE } from '@/components/FFEContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Menu, Search, List, Grid, Save, FileDown } from 'lucide-react'

interface FFEHeaderProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function FFEHeader({ isSidebarOpen, onToggleSidebar }: FFEHeaderProps) {
  const { projects, currentProjectId, currentScheduleId } = useFFE()
  const currentProject = projects.find(p => p.id === currentProjectId)
  const currentSchedule = currentProject?.schedules.find(s => s.id === currentScheduleId)

  return (
    <header className="bg-background p-4 border-b">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="text-right">
          <h1 className="text-2xl font-bold">{currentProject?.name || 'Select a Project'}</h1>
          <p className="text-sm text-muted-foreground">
            {currentProject?.clientName && `${currentProject.clientName} / `}
            {currentSchedule?.name || 'Select a Schedule'}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Navigate to Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seating">Seating</SelectItem>
              <SelectItem value="lighting">Lighting</SelectItem>
            </SelectContent>
          </Select>
          <Button>Add New Category</Button>
        </div>

        <div className="flex items-center space-x-2">
          <Select defaultValue="summary">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary">Summary</SelectItem>
              <SelectItem value="detail">Detail</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>

          <Button variant="outline" size="icon">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <FileDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}