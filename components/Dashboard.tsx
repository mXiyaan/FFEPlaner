'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Menu } from 'lucide-react'
import { useFFE } from './FFEContext'
import { useRouter } from 'next/navigation'

type DashboardProps = {
  onToggleSidebar: () => void
}

export default function Dashboard({ onToggleSidebar }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const { projects, setCurrentProjectId } = useFFE()
  const router = useRouter()

  const filteredProjects = projects
    .filter(project => {
      if (searchTerm) {
        return project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               project.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return true
    })
    .filter(project => {
      if (filterStatus === 'all') return true
      return true
    })

  const handleProjectClick = (projectId: string) => {
    setCurrentProjectId(projectId)
    router.push(`/projects/${projectId}`)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-background p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="text-right">
            <h1 className="text-2xl font-bold">Project Dashboard</h1>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto p-6">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <Card 
                key={project.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Budget: ${project.totalBudget.toLocaleString()}
                    </p>
                    {project.clientName && (
                      <p className="text-sm font-medium">{project.clientName}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {project.schedules.map((schedule) => (
                        <span 
                          key={schedule.id} 
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                        >
                          {schedule.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}