'use client'

import { useState } from 'react'
import { useFFE } from '@/components/FFEContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Menu, Search, List, Grid, Save, FileDown, Plus, Eye } from 'lucide-react'
import PDFPreviewDialog from './PDFPreviewDialog'

interface CategoryDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (name: string, prefix: string) => void
}

function AddCategoryDialog({ isOpen, onClose, onAdd }: CategoryDialogProps) {
  const [categoryName, setCategoryName] = useState('')
  const [prefix, setPrefix] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!categoryName.trim()) {
      setError('Category name is required')
      return
    }
    if (!prefix.trim()) {
      setError('Prefix is required')
      return
    }
    onAdd(categoryName.trim(), prefix.trim().toUpperCase())
    setCategoryName('')
    setPrefix('')
    setError('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Seating, Lighting"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prefix">Category Prefix</Label>
            <Input
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="e.g., ST, LT"
              maxLength={3}
              className="uppercase"
            />
            <p className="text-sm text-muted-foreground">
              Maximum 3 characters, will be automatically capitalized
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface FFEHeaderProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function FFEHeader({ isSidebarOpen, onToggleSidebar }: FFEHeaderProps) {
  const {
    projects,
    currentProjectId,
    currentScheduleId,
    addCategory,
    getCategories,
    pdfTheme,
    setPDFTheme,
    pdfColumnVisibility,
    setPDFColumnVisibility
  } = useFFE()

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isPDFPreviewOpen, setIsPDFPreviewOpen] = useState(false)

  const currentProject = projects.find(p => p.id === currentProjectId)
  const currentSchedule = currentProject?.schedules.find(s => s.id === currentScheduleId)
  const categories = currentProjectId ? getCategories(currentProjectId) : []

  const handleAddCategory = (name: string, prefix: string) => {
    if (currentProjectId) {
      addCategory(currentProjectId, name, prefix)
    }
  }

  return (
    <>
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
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={() => setIsAddCategoryOpen(true)}
              disabled={!currentScheduleId}
              title={!currentScheduleId ? "Create a schedule first to add categories" : ""}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Category
            </Button>
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
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPDFPreviewOpen(true)}
              disabled={!currentScheduleId}
              title={!currentScheduleId ? "Select a schedule to preview PDF" : ""}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <AddCategoryDialog
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onAdd={handleAddCategory}
      />

      {currentProject && currentSchedule && (
        <PDFPreviewDialog
          isOpen={isPDFPreviewOpen}
          onClose={() => setIsPDFPreviewOpen(false)}
          theme={pdfTheme}
          onThemeChange={setPDFTheme}
          columnVisibility={pdfColumnVisibility}
          onColumnVisibilityChange={setPDFColumnVisibility}
          items={currentSchedule.items}
          projectName={currentProject.name}
          scheduleName={currentSchedule.name}
          clientName={currentProject.clientName}
        />
      )}
    </>
  )
}