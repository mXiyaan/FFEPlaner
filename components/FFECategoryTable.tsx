'use client'

import { FFEItem } from '@/types/ffe'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, MoreVertical, Trash, CheckCircle, Clock } from 'lucide-react'

interface FFECategoryTableProps {
  items: FFEItem[]
  category: string
  isEditable: boolean
  viewMode: 'list' | 'grid'
}

export function FFECategoryTable({ items, category, isEditable, viewMode }: FFECategoryTableProps) {
  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Adding new item')
  }

  const handleEditItem = (item: FFEItem, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Editing item:', item)
  }

  const handleDeleteItem = (item: FFEItem, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Deleting item:', item)
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.product}</p>
            <p className="text-sm">${item.price.toLocaleString()}</p>
          </div>
        ))}
        <div
          onClick={handleAddItem}
          className="flex items-center justify-center h-48 bg-muted rounded-lg border-2 border-dashed border-muted-foreground cursor-pointer"
        >
          <Plus className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    )
  }

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
                  <div onClick={(e) => handleEditItem(item, e)}>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <div onClick={(e) => handleDeleteItem(item, e)}>
                    <Button variant="ghost" size="sm">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={15}>
              <div onClick={handleAddItem} className="cursor-pointer">
                <div className="flex items-center justify-center h-16 hover:bg-muted rounded-lg">
                  <Plus className="h-6 w-6 mr-2" />
                  Add New Item
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}