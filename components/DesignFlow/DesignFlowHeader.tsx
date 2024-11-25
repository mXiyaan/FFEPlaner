'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Menu, Search, List, Grid, Save, FileDown } from 'lucide-react'
import { Project, Schedule } from '@/types/ffe'

interface DesignFlowHeaderProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
  currentProject: Project
  currentSchedule: Schedule
  viewMode: 'summary' | 'detail'
  onViewModeChange: (mode: 'summary' | 'detail') => void
  onAddCategory: () => void
}

export function DesignFlowHeader({
  isSidebarOpen,
  onToggleSidebar,
  currentProject,
  currentSchedule,
  viewMode,
  onViewModeChange,
  onAddCategory
}: DesignFlowHeaderProps) {
  return (
    <header className="bg-background p-4 border-b">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="text-right">
          <h1 className="text-2xl font-bold">{currentProject.name}</h1>
          <p className="text-sm text-muted-foreground">{currentSchedule.name}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Navigate to Section" />
            </SelectTrigger>
            <SelectContent>
              {/* Categories will be mapped here */}
            </SelectContent>
          </Select>
          <Button onClick={onAddCategory}>Add New Category</Button>
        </div>

        <div className="flex items-center space-x-2">
          <Select value={viewMode} onValueChange={onViewModeChange}>
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