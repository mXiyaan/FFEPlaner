'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Search, Plus } from 'lucide-react'
import { Product } from '@/types/product'
import ProductCard from './ProductCard'
import { ScrollArea } from "@/components/ui/scroll-area"

interface ProductSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct: (product: Product) => void
}

export default function ProductSelectionDialog({
  isOpen,
  onClose,
  onSelectProduct
}: ProductSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Sample products data - replace with your actual data source
  const sampleProducts = [
    {
      id: '1',
      name: 'Modern Lounge Chair',
      category: 'Seating',
      brand: 'ComfortPlus',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop',
      description: 'Contemporary lounge chair with premium comfort',
      specifications: {
        material: 'Leather',
        dimensions: '76x82x85cm',
        weight: '15kg'
      },
      stock: 12,
      dateAdded: '2024-03-15'
    },
    {
      id: '2',
      name: 'Pendant Light',
      category: 'Lighting',
      brand: 'BrightLife',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1530603907829-659dc1b3f567?q=80&w=1964&auto=format&fit=crop',
      description: 'Modern pendant light with adjustable height',
      specifications: {
        material: 'Metal and Glass',
        dimensions: '30x30x100cm',
        weight: '2.5kg'
      },
      stock: 20,
      dateAdded: '2024-03-14'
    },
    {
      id: '3',
      name: 'Coffee Table',
      category: 'Tables',
      brand: 'ErgoDesk',
      price: 449.99,
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1964&auto=format&fit=crop',
      description: 'Minimalist coffee table with storage',
      specifications: {
        material: 'Oak Wood',
        dimensions: '120x60x45cm',
        weight: '25kg'
      },
      stock: 8,
      dateAdded: '2024-03-13'
    }
  ]

  const recentProducts = sampleProducts.slice(0, 2)

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleProductSelect = (product: Product) => {
    onSelectProduct(product)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Product</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-4 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>

        <Tabs defaultValue="all" className="flex-1" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 h-[500px]">
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <ProductCard
                      imageUrl={product.image}
                      category={product.category}
                      name={product.name}
                      brand={product.brand}
                      price={product.price}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <ProductCard
                      imageUrl={product.image}
                      category={product.category}
                      name={product.name}
                      brand={product.brand}
                      price={product.price}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}