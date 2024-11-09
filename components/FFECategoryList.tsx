'use client'

import { useState } from 'react'
import { Schedule, FFEItem } from '@/types/ffe'
import { FFECategoryTable } from '@/components/FFECategoryTable'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Printer, Share2, Edit, Save, Trash } from 'lucide-react'

interface FFECategoryListProps {
  schedule: Schedule
  searchTerm: string
  viewMode: 'list' | 'grid'
}

export function FFECategoryList({ schedule, searchTerm, viewMode }: FFECategoryListProps) {
  const [editableCategories, setEditableCategories] = useState<Record<string, boolean>>({})

  const groupedItems = schedule.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
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

  return (
    <div className="space-y-4">
      {Object.entries(groupedItems).map(([category, items]) => (
        <Collapsible key={category} className="mb-4">
          <div className="flex items-center justify-between w-full p-2 bg-muted rounded-t-lg">
            <CollapsibleTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <h2 className="text-lg font-semibold">{category} ({items.length})</h2>
                <ChevronDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                Total: ${calculateCategoryTotal(items).toLocaleString()}
              </span>
              <div onClick={(e) => handlePrint(category, e)}>
                <Button variant="ghost" size="sm">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
              <div onClick={(e) => handleShare(category, e)}>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              {editableCategories[category] ? (
                <div onClick={(e) => handleSaveCategory(category, e)}>
                  <Button variant="ghost" size="sm">
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div onClick={(e) => handleEditCategory(category, e)}>
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
            <div id={`category-${category}`}>
              <FFECategoryTable
                items={items}
                category={category}
                isEditable={editableCategories[category]}
                viewMode={viewMode}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}