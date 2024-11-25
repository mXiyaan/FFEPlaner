'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Menu, Grid, List } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from './ProductCard'
import ProductListItem from './ProductListItem'
import AddNewProductDialog from './AddNewProductDialog'

interface ProductLibraryProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function ProductLibrary({ isSidebarOpen, onToggleSidebar }: ProductLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterBrand, setFilterBrand] = useState('all')
  const [filterPriceRange, setFilterPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [categories] = useState(['Seating', 'Lighting', 'Tables', 'Storage'])

  // Sample products data
  const sampleProducts = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop',
      category: 'Seating',
      name: 'Modern Lounge Chair',
      brand: 'ComfortPlus',
      price: 599.99
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1530603907829-659dc1b3f567?q=80&w=1964&auto=format&fit=crop',
      category: 'Lighting',
      name: 'Pendant Light',
      brand: 'BrightLife',
      price: 299.99
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1964&auto=format&fit=crop',
      category: 'Tables',
      name: 'Coffee Table',
      brand: 'ErgoDesk',
      price: 449.99
    }
  ]

  // Recently added products
  const recentProducts = [
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1964&auto=format&fit=crop',
      category: 'Storage',
      name: 'Modern Shelf Unit',
      brand: 'StoragePro',
      price: 799.99
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1964&auto=format&fit=crop',
      category: 'Seating',
      name: 'Dining Chair',
      brand: 'ComfortPlus',
      price: 249.99
    }
  ]

  // Most used products
  const mostUsedProducts = [
    {
      id: '6',
      imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1964&auto=format&fit=crop',
      category: 'Tables',
      name: 'Office Desk',
      brand: 'ErgoDesk',
      price: 899.99
    },
    {
      id: '7',
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1964&auto=format&fit=crop',
      category: 'Lighting',
      name: 'Floor Lamp',
      brand: 'BrightLife',
      price: 199.99
    }
  ]

  const renderProducts = (products: typeof sampleProducts) => {
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              category={product.category}
              name={product.name}
              brand={product.brand}
              price={product.price}
            />
          ))}
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            imageUrl={product.imageUrl}
            category={product.category}
            name={product.name}
            brand={product.brand}
            price={product.price}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-background p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="text-right">
            <h1 className="text-2xl font-bold">Product Library</h1>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-accent' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-accent' : ''}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <AddNewProductDialog />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-x-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterBrand} onValueChange={setFilterBrand}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="ComfortPlus">ComfortPlus</SelectItem>
              <SelectItem value="ErgoDesk">ErgoDesk</SelectItem>
              <SelectItem value="BrightLife">BrightLife</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriceRange} onValueChange={setFilterPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-100">$0 - $100</SelectItem>
              <SelectItem value="100-500">$100 - $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1000</SelectItem>
              <SelectItem value="1000+">$1000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
            <TabsTrigger value="most-used">Most Used</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {renderProducts(sampleProducts)}
          </TabsContent>

          <TabsContent value="recent">
            {renderProducts(recentProducts)}
          </TabsContent>

          <TabsContent value="most-used">
            {renderProducts(mostUsedProducts)}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}