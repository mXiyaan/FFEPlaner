'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus, Printer, Share2, Edit, Save, Trash, CheckCircle, Clock, MoreVertical, ChevronDown } from 'lucide-react'
import { Project, Schedule, FFEItem } from '@/types/ffe'

interface DesignFlowContentProps {
  viewMode: 'summary' | 'detail'
  currentProject: Project
  currentSchedule: Schedule
  groupedItems: Record<string, FFEItem[]>
  editableCategories: Record<string, boolean>
  onEditCategory: (category: string) => void
  onSaveCategory: (category: string) => void
  onDeleteCategory: (category: string) => void
  onAddItem: (category: string, existingItem?: FFEItem) => void
  onDeleteItem: (item: FFEItem) => void
}

export function DesignFlowContent({
  viewMode,
  currentProject,
  currentSchedule,
  groupedItems,
  editableCategories,
  onEditCategory,
  onSaveCategory,
  onDeleteCategory,
  onAddItem,
  onDeleteItem
}: DesignFlowContentProps) {
  const calculateCategoryTotal = (items: FFEItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateScheduleTotal = () => {
    return currentSchedule.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <main className="flex-1 overflow-x-auto p-4">
      <div className="mb-4 flex justify-between items-center bg-muted p-4 rounded-lg">
        <div>
          <p className="text-sm font-semibold">Project Budget: ${currentProject.totalBudget.toLocaleString()}</p>
          <p className="text-sm font-semibold">Schedule Budget: ${currentSchedule.budget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Total Spent: ${calculateScheduleTotal().toLocaleString()}</p>
          <p className="text-sm font-semibold">Remaining: ${(currentSchedule.budget - calculateScheduleTotal()).toLocaleString()}</p>
        </div>
      </div>

      {viewMode === 'summary' ? (
        <CategoryList
          groupedItems={groupedItems}
          editableCategories={editableCategories}
          onEditCategory={onEditCategory}
          onSaveCategory={onSaveCategory}
          onDeleteCategory={onDeleteCategory}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
          calculateCategoryTotal={calculateCategoryTotal}
        />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Detail View</h2>
          <p>Detail view content will be implemented in the future.</p>
        </div>
      )}
    </main>
  )
}

interface CategoryListProps {
  groupedItems: Record<string, FFEItem[]>
  editableCategories: Record<string, boolean>
  onEditCategory: (category: string) => void
  onSaveCategory: (category: string) => void
  onDeleteCategory: (category: string) => void
  onAddItem: (category: string, existingItem?: FFEItem) => void
  onDeleteItem: (item: FFEItem) => void
  calculateCategoryTotal: (items: FFEItem[]) => number
}

function CategoryList({
  groupedItems,
  editableCategories,
  onEditCategory,
  onSaveCategory,
  onDeleteCategory,
  onAddItem,
  onDeleteItem,
  calculateCategoryTotal
}: CategoryListProps) {
  return (
    <div className="space-y-4">
      {Object.entries(groupedItems).map(([category, items]) => (
        <CategorySection
          key={category}
          category={category}
          items={items}
          isEditable={editableCategories[category]}
          onEdit={() => onEditCategory(category)}
          onSave={() => onSaveCategory(category)}
          onDelete={() => onDeleteCategory(category)}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
          total={calculateCategoryTotal(items)}
        />
      ))}
    </div>
  )
}

interface CategorySectionProps {
  category: string
  items: FFEItem[]
  isEditable: boolean
  onEdit: () => void
  onSave: () => void
  onDelete: () => void
  onAddItem: (category: string, existingItem?: FFEItem) => void
  onDeleteItem: (item: FFEItem) => void
  total: number
}

function CategorySection({
  category,
  items,
  isEditable,
  onEdit,
  onSave,
  onDelete,
  onAddItem,
  onDeleteItem,
  total
}: CategorySectionProps) {
  return (
    <Collapsible className="mb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-muted rounded-t-lg">
        <h2 className="text-lg font-semibold">{category} ({items.length})</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Total: ${total.toLocaleString()}</span>
          <Button variant="ghost" size="sm">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          {isEditable ? (
            <Button variant="ghost" size="sm" onClick={onSave}>
              <Save className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash className="h-4 w-4" />
          </Button>
          <ChevronDown className="h-4 w-4" />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <CategoryTable
          category={category}
          items={items}
          isEditable={isEditable}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
        />
      </CollapsibleContent>
    </Collapsible>
  )
}

interface CategoryTableProps {
  category: string
  items: FFEItem[]
  isEditable: boolean
  onAddItem: (category: string, existingItem?: FFEItem) => void
  onDeleteItem: (item: FFEItem) => void
}

function CategoryTable({
  category,
  items,
  isEditable,
  onAddItem,
  onDeleteItem
}: CategoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Code</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Dimensions (mm)</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Finish</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Lead Time</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              </TableCell>
              <TableCell>
                {isEditable ? (
                  <Input value={item.productCode} className="w-24" />
                ) : (
                  item.productCode
                )}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.dimensions}</TableCell>
              <TableCell>{item.material}</TableCell>
              <TableCell>{item.finish}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price.toLocaleString()}</TableCell>
              <TableCell>${(item.price * item.quantity).toLocaleString()}</TableCell>
              <TableCell>{item.leadTime}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>
                {item.status === 'Approved' && <CheckCircle className="text-green-500" />}
                {item.status === 'Pending' && <Clock className="text-yellow-500" />}
                {item.status === 'In Production' && <Clock className="text-blue-500" />}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDeleteItem(item)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={15}>
              <Button variant="ghost" className="w-full" onClick={() => onAddItem(category)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Item
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}