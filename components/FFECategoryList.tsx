'use client'

import { useState, useEffect } from 'react'
import { Schedule, FFEItem } from '@/types/ffe'
import { FFECategoryTable } from '@/components/FFECategoryTable'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Printer, Share2, Edit, Save, Trash } from 'lucide-react'
import { useFFE } from './FFEContext'
import { cn } from '@/lib/utils'

interface FFECategoryListProps {
  schedule: Schedule
  searchTerm: string
  viewMode: 'list' | 'grid'
}

export function FFECategoryList({ schedule, searchTerm, viewMode }: FFECategoryListProps) {
  const [editableCategories, setEditableCategories] = useState<Record<string, boolean>>({})
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const { currentProjectId, getCategories } = useFFE()
  const categories = currentProjectId ? getCategories(currentProjectId) : []

  // Auto-expand all categories initially
  useEffect(() => {
    setExpandedCategories(new Set(categories.map(cat => cat.name)))
  }, [categories])

  // Group items by category
  const groupedItems = categories.reduce((acc, category) => {
    acc[category.name] = schedule.items.filter(item => item.category === category.name)
    if (!acc[category.name]) {
      acc[category.name] = []
    }
    return acc
  }, {} as Record<string, FFEItem[]>)

  const calculateCategoryTotal = (items: FFEItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handlePrint = (category: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const printContent = document.getElementById(`category-${category}`)
    if (printContent) {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${category} - Print</title>
              <style>
                body { font-family: Arial, sans-serif; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              ${printContent.outerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const handleShare = (category: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`Sharing ${category}`)
  }

  const handleEditCategory = (category: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditableCategories(prev => ({ ...prev, [category]: true }))
  }

  const handleSaveCategory = (category: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditableCategories(prev => ({ ...prev, [category]: false }))
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">No categories have been created yet.</p>
          <p className="text-sm text-muted-foreground">
            Use the "Add New Category" button in the header to create categories.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {categories.map(category => (
        <Collapsible 
          key={category.id} 
          className="mb-4"
          open={expandedCategories.has(category.name)}
          onOpenChange={() => toggleCategory(category.name)}
        >
          <div className="flex items-center justify-between w-full p-2 bg-muted rounded-t-lg">
            <CollapsibleTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  !expandedCategories.has(category.name) && "-rotate-90"
                )} />
                <h2 className="text-lg font-semibold">
                  {category.name} ({groupedItems[category.name]?.length || 0})
                </h2>
              </div>
            </CollapsibleTrigger>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                Total: ${calculateCategoryTotal(groupedItems[category.name] || []).toLocaleString()}
              </span>
              <div onClick={(e) => handlePrint(category.name, e)}>
                <Button variant="ghost" size="sm">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
              <div onClick={(e) => handleShare(category.name, e)}>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              {editableCategories[category.name] ? (
                <div onClick={(e) => handleSaveCategory(category.name, e)}>
                  <Button variant="ghost" size="sm">
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div onClick={(e) => handleEditCategory(category.name, e)}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <CollapsibleContent>
            <div id={`category-${category.name}`}>
              <FFECategoryTable
                items={groupedItems[category.name] || []}
                category={category.name}
                isEditable={editableCategories[category.name]}
                viewMode={viewMode}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}