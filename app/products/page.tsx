'use client'

import { useState } from 'react'
import { FFESidebar } from '@/components/FFESidebar'
import ProductLibrary from '@/components/ProductLibrary'

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <FFESidebar 
        isOpen={isSidebarOpen}
        currentView="products"
        onViewChange={() => {}}
      />
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ProductLibrary 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      </div>
    </div>
  )
}